import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/app/model/recipe.model';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/app/libraries/util/services/database.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

@Component({
  selector: 'profile-bookmarks',
  templateUrl: './profile-bookmarks.component.html',
  styleUrls: ['./profile-bookmarks.component.scss'],
})
export class ProfileBookmarksComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(
    private db: DatabaseService,
    private auth: AuthService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    this.auth.sub_userPrivateData((data) => {
      this.db.get_recipes(data.bookmarks).subscribe((recipes) => {
        this.recipes = recipes.docs.map((dataItem) =>
          dataItem.data()
        ) as RecipeModel[];
      });
    });
  }
}
