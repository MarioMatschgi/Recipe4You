import { RecipeData } from './../../model/recipe.model';
import { DatabaseService } from './../../services/database.service';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeHelper, RecipeModel } from 'src/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizationService } from 'src/app/services/localization.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input('type') type: 'create' | 'edit' | 'delete';

  lang: string;
  recipe: RecipeModel;

  constructor(
    private db: DatabaseService,
    private router: RouterService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    this.setup();
  }

  async setup() {
    // IF NOT LOGGED IN REDIRECT TO LOGIN
    if (!this.auth.loggedIn) {
      this.router.nav_login();
      return;
    }

    this.lang = RecipeHelper.lang;

    if (this.type == 'create') {
      this.recipe = new RecipeModel();
    } else if (this.type == 'edit' || this.type == 'delete') {
      const params = await this.route.params.pipe(take(1)).toPromise();

      this.recipe = await this.db
        .get_recipe(params['id'])
        .pipe(take(1))
        .toPromise();

      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author))
        this.router.nav_login();
    }

    if (!this.recipe.langs) this.recipe.langs = {};
    if (!this.recipe.langs[this.lang])
      this.recipe.langs[this.lang] = new RecipeData();
  }

  cancel() {
    if (this.recipe.id == undefined) {
      this.router.nav_home();
      return;
    }
    this.router.nav_recipe(this.recipe.id);
  }

  change_lang() {
    if (!this.recipe.langs[this.lang])
      this.recipe.langs[this.lang] = new RecipeData();
  }

  async onSubmit(form: NgForm) {
    form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!form.valid) return;
    // IF NOT LOGGED IN RETURN
    if (!this.auth.loggedIn) return;

    if (this.type == 'create') {
      let recipe = await this.db.recipe_exists(
        RecipeHelper.getData(this.recipe).name
      );
      if (!recipe) {
        this.recipe.date_added = new Date();
        this.recipe.date_edited = this.recipe.date_added;
        this.recipe.author = this.auth.userPublicData.uid;
        const doc = await this.db.add_recipe(this.recipe);

        this.recipe.id = doc.id;
        await this.db.edit_recipe(doc.id, this.recipe);

        this.router.nav_recipe(doc.id);
      } else {
        alert(this.local.data.recipe.create.already_exists);
      }
    } else if (this.type == 'edit') {
      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author)) return;

      this.recipe.date_edited = new Date();

      await this.db.edit_recipe(this.recipe.id, this.recipe);
      this.router.nav_recipe(this.recipe.id);
    } else if (this.type == 'delete') {
      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author)) return;

      if (
        confirm(
          this.local.data.recipe.delete.confirm.replace(
            '%recipe%',
            RecipeHelper.getData(this.recipe).name
          )
        )
      ) {
        this.db.remove_recipe(this.recipe.id);
        this.router.nav_home();
      }
    }
  }
}
