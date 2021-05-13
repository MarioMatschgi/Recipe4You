import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss'],
})
export class RecipePreviewComponent implements OnInit {
  @Input('recipe') recipe: RecipeModel;

  constructor(public router: RouterService) {}

  ngOnInit(): void {}

  navigate_recipe() {
    this.router.nav_recipe(this.recipe.id);
  }
}
