import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksComponent implements OnInit {
  recipes: RecipeModel[];

  constructor(private db: DatabaseService, private auth: AuthService) {}

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
