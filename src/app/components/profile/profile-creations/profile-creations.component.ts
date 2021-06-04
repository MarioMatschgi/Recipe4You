import {
  RouterService,
  RouterUrls,
} from './../../../libraries/util/services/router.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { DatabaseService } from 'src/app/libraries/util/services/database.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import { RecipeModel } from 'src/app/model/recipe.model';

@Component({
  selector: 'profile-creations',
  templateUrl: './profile-creations.component.html',
  styleUrls: ['./profile-creations.component.scss'],
})
export class ProfileCreationsComponent implements OnInit {
  RouterUrls = RouterUrls;
  recipes: RecipeModel[];

  constructor(
    private auth: AuthService,
    private db: DatabaseService,
    public local: LocalizationService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    this.auth.sub_userData((data) => {
      this.db.get_recipes_for(data.uid).subscribe((recipes) => {
        this.recipes = recipes.docs.map((dataItem) =>
          dataItem.data()
        ) as RecipeModel[];
      });
    });
  }
}
