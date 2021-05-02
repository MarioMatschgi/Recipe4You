import { take } from 'rxjs/operators';
import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeHelper, RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
  get setup(): boolean {
    for (const key of Object.keys(this.setups)) {
      if (!this.setups[key]) return false;
    }

    return true;
  }
  setups: { [key: string]: boolean } = { recipe: false };

  recipe: RecipeModel;
  recipe_id: string;
  recipe_date_added: string;
  recipe_date_edited: string;

  author: string;
  bookmarked: boolean;

  constructor(
    public db: DatabaseService,
    public router: RouterService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe_id = params['id'];
    });

    this.db.get_recipe(this.recipe_id).subscribe(async (recipe) => {
      if (recipe == null) {
        console.log('RECIPE NOT FOUND!');
      }
      this.recipe = recipe;
      if (recipe != null) {
        this.recipe_date_added = new Date(recipe.date_added).toLocaleString();
        this.recipe_date_edited = new Date(recipe.date_edited).toLocaleString();
      }

      const res = await Promise.all([
        this.auth.get_displayname_or_email(this.recipe.author),
      ]);
      this.author = res[0];

      this.setups.recipe = true;
    });

    if (this.auth.loggedIn) {
      this.bookmarked = this.auth.userPrivateData.bookmarks.includes(
        this.recipe_id
      );
    }
  }

  bookmark() {
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

    this.auth.doc_userPrivate.update({
      bookmarks: this.auth.userPrivateData.bookmarks,
    });
  }
}
