import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/app/model/recipe.model';

@Component({
  selector: 'recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent implements OnInit {
  recipe: RecipeModel;

  constructor() {}

  ngOnInit(): void {
    this.recipe = new RecipeModel();
  }
}
