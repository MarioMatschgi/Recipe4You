import { Component, Input, OnInit } from '@angular/core';
import {
  RecipeData,
  RecipeHelper,
  RecipeModel,
} from 'src/app/model/recipe.model';
import { LocalizationService } from 'src/app/libraries/services/localization.service';
import { RouterService } from 'src/app/libraries/services/router.service';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
})
export class RecipePreviewComponent implements OnInit {
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
