import { RecipeData } from '../../../model/recipe.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  emptyRecipeModel,
  RecipeHelper,
  RecipeModel,
} from 'src/app/app/model/recipe.model';

import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/app/libraries/util/services/database.service';
import { RouterService } from 'src/app/libraries/util/services/router.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import { LoadService } from 'src/app/libraries/loading/services/load.service';
import { RouterUrls } from 'src/app/libraries/util/models/router.model';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipes-view.component.html',
  styleUrls: ['./recipes-view.component.scss'],
})
export class RecipesViewComponent implements OnInit {
  RouterUrls = RouterUrls;

  recipe: RecipeModel;
  recipe_data: RecipeData;
  recipe_id: string;
  recipe_date_added: string;
  recipe_date_edited: string;

  author: string;
  bookmarked: boolean;
  starred: boolean;

  constructor(
    public db: DatabaseService,
    public router: RouterService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public local: LocalizationService,
    public loader: LoadService
  ) {}

  ngOnInit(): void {
    this.loader.load();

    this.route.params.subscribe((params) => {
      this.recipe_id = params['id'];
    });

    this.db.get_recipe(this.recipe_id).subscribe(async (recipe) => {
      if (recipe != undefined) {
        this.recipe = { ...emptyRecipeModel, ...recipe };

        if (recipe != null) {
          this.recipe_data = RecipeHelper.getData(this.recipe);

          this.recipe_date_added = new Date(recipe.date_added).toLocaleString();
          this.recipe_date_edited = new Date(
            recipe.date_edited
          ).toLocaleString();

          const res = await Promise.all([
            this.auth.get_displayname_or_email(this.recipe.author),
          ]);
          this.author = res[0];
        }
      }

      this.loader.unload();
    });

    if (this.auth.loggedIn) {
      this.bookmarked = this.auth.userPrivateData.bookmarks.includes(
        this.recipe_id
      );
    }
  }

  bookmark() {
    // IF NOT LOGGED IN REDIRECT TO LOGIN
    if (!this.auth.loggedIn) {
      this.router.nav_login();
      return;
    }

    this.bookmarked = !this.bookmarked;
    if (this.bookmarked)
      this.auth.userPrivateData.bookmarks.push(this.recipe_id);
    else
      for (let i = 0; i < this.auth.userPrivateData.bookmarks.length; i++) {
        if (this.auth.userPrivateData.bookmarks[i] === this.recipe_id)
          this.auth.userPrivateData.bookmarks.splice(i, 1);
      }

    this.auth.doc_userPrivate.set(
      { bookmarks: this.auth.userPrivateData.bookmarks },
      { merge: true }
    );
  }
  star() {
    // IF NOT LOGGED IN REDIRECT TO LOGIN
    if (!this.auth.loggedIn) {
      this.router.nav_login();
      return;
    }
    this.starred = !this.starred;
  }
}
