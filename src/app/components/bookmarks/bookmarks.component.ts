import { LocalizationService } from './../../services/localization.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(
    private db: DatabaseService,
    private router: RouterService,
    private auth: AuthService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    // IF NOT LOGGED IN REDIRECT TO LOGIN
    if (!this.auth.loggedIn) {
      this.router.nav_login();
      return;
    }

    this.auth.sub_userPrivateData((data) => {
      // this.recipes = this.db.get_recipes(data.bookmarks);
      this.db.get_recipes(data.bookmarks).subscribe((recipes) => {
        this.recipes = recipes.docs.map((dataItem) =>
          dataItem.data()
        ) as RecipeModel[];
      });
    });
  }
}
