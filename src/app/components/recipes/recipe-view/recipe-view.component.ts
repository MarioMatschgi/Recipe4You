import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeHelper, RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
  setup = false;

  recipe: RecipeModel;
  recipe_id: string;
  recipe_date_added: string;
  recipe_date_edited: string;

  constructor(
    public route: ActivatedRoute,
    public db: DatabaseService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe_id = params['name'];
    });

    this.db.get_recipe(this.recipe_id).subscribe((recipe) => {
      if (recipe == null) {
        console.log('RECIPE NOT FOUND!');
      }
      this.recipe = recipe;
      this.recipe_date_added = new Date(recipe.date_added).toLocaleString();
      this.recipe_date_edited = new Date(recipe.date_edited).toLocaleString();

      if (!this.setup) this.setup = true;
    });
  }
}
