import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeModel } from 'src/app/model/recipe.model';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
  setup = false;

  recipe: RecipeModel;
  recipe_id: string;

  constructor(private route: ActivatedRoute, private db: DatabaseService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe_id = params['name'];
    });

    this.db.get_recipe(this.recipe_id).subscribe((recipe) => {
      if (recipe == null) {
        console.log('RECIPE NOT FOUND!');
      }
      this.recipe = recipe;

      if (!this.setup) this.setup = true;
    });
  }
}
