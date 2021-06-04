import { Component, Input, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import {
  RouterService,
  RouterUrls,
} from 'src/app/libraries/util/services/router.service';
import {
  RecipeData,
  RecipeHelper,
  RecipeModel,
} from 'src/app/model/recipe.model';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
})
export class RecipePreviewComponent implements OnInit {
  RouterUrls = RouterUrls;

  @Input('recipe') recipe: RecipeModel;
  recipe_data: RecipeData;

  constructor(
    public router: RouterService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    this.recipe_data = RecipeHelper.getData(this.recipe);
  }
}
