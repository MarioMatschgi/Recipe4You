import { RecipeData } from './../../model/recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeHelper, RecipeModel } from 'src/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/app/libraries/services/database.service';
import { RouterService } from 'src/app/libraries/services/router.service';
import { LocalizationService } from 'src/app/libraries/services/localization.service';

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
      this.router.nav('home');
      return;
    }
    this.router.nav('recipes', [this.recipe.id]);
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
      this.recipe.date_added = new Date();
      this.recipe.date_edited = this.recipe.date_added;
      this.recipe.author = this.auth.userPublicData.uid;
      const doc = await this.db.add_recipe(this.recipe);

      this.recipe.id = doc.id;
      await this.db.edit_recipe(doc.id, this.recipe);

      this.router.nav('recipes', [doc.id]);
    } else if (this.type == 'edit') {
      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author)) return;

      this.recipe.date_edited = new Date();

      await this.db.edit_recipe(this.recipe.id, this.recipe);
      this.router.nav('recipes', [this.recipe.id]);
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
        this.router.nav('home');
      }
    }
  }
}
