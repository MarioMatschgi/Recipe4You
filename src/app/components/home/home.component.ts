import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/libraries/util/services/router.service';
import { DatabaseService } from 'src/app/libraries/util/services/database.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: Observable<RecipeModel[]>;

  constructor(
    public router: RouterService,
    public db: DatabaseService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    this.recipes = this.db.get_all_recipes();
  }
}
