import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'recipe-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @Input('recipe') recipe: RecipeModel;

  constructor(public router: RouterService) {}

  ngOnInit(): void {}

  navigate_recipe() {
    this.router.nav_recipe(this.recipe.id);
  }
}
