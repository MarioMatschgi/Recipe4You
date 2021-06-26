import { LoadService } from './../../../../libraries/loading/services/load.service';
import { Component, Input, OnInit } from '@angular/core';
import {
  RecipeData,
  RecipeHelper,
  RecipeModel,
} from 'src/app/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/app/libraries/util/services/database.service';
import { RouterService } from 'src/app/libraries/util/services/router.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import { RouterUrls } from 'src/app/libraries/util/models/router.model';

@Component({
  selector: 'recipe-base',
  templateUrl: './recipe-base.component.html',
  styleUrls: ['./recipe-base.component.scss'],
})
export class RecipeBaseComponent implements OnInit {
  @Input('type') type: 'create' | 'edit' | 'delete';

  lang: string;
  recipe: RecipeModel;
  loader_id = 'recipe/base';

  constructor(
    private db: DatabaseService,
    private router: RouterService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public local: LocalizationService,
    public loader: LoadService
  ) {}

  ngOnInit(): void {
    this.setup();
  }

  async setup() {
    this.loader.load();
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
    this.loader.unload();
  }

  cancel() {
    if (this.recipe.id == undefined) {
      this.router.nav(RouterUrls.home);
      return;
    }
    this.router.nav(RouterUrls.recipes, [this.recipe.id]);
  }

  change_lang() {
    if (!this.recipe.langs[this.lang])
      this.recipe.langs[this.lang] = new RecipeData();
  }

  async onSubmit(form: NgForm, btn: HTMLButtonElement) {
    form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!form.valid) return;
    // IF NOT LOGGED IN RETURN
    if (!this.auth.loggedIn) return;

    this.loader.load(this.loader_id);
    if (this.type == 'create') {
      this.recipe.date_added = new Date();
      this.recipe.date_edited = this.recipe.date_added;
      this.recipe.author = this.auth.userPublicData.uid;
      const doc = await this.db.add_recipe(this.recipe);

      this.recipe.id = doc.id;
      await this.db.edit_recipe(doc.id, this.recipe);

      this.loader.unload(this.loader_id);
      this.router.nav(RouterUrls.recipes, [doc.id]);
    } else if (this.type == 'edit') {
      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author)) return;

      this.recipe.date_edited = new Date();

      await this.db.edit_recipe(this.recipe.id, this.recipe);

      this.loader.unload(this.loader_id);
      this.router.nav(RouterUrls.recipes, [this.recipe.id]);
    } else if (this.type == 'delete') {
      // IF NOT RECIPE AUTHOR RETURN
      if (!this.auth.is_author_or_admin(this.recipe.author)) return;

      if (
        confirm(
          this.local.data.recipe.delete.confirm.replaceAll(
            '%recipe%',
            RecipeHelper.getData(this.recipe).name
          )
        )
      ) {
        this.db.remove_recipe(this.recipe.id);
        this.router.nav(RouterUrls.home);
      }
    }
  }
}
