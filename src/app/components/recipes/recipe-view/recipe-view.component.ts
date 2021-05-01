import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeHelper, RecipeModel } from 'src/app/model/recipe.model';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from 'src/app/services/auth.service';

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

  author: string;

  constructor(
    public db: DatabaseService,
    public router: RouterService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.recipe_id = params['id'];
    });

    this.db.get_recipe(this.recipe_id).subscribe(async (recipe) => {
      if (recipe == null) {
        console.log('RECIPE NOT FOUND!');
      }
      this.recipe = recipe;
      if (recipe != null) {
        this.recipe_date_added = new Date(recipe.date_added).toLocaleString();
        this.recipe_date_edited = new Date(recipe.date_edited).toLocaleString();
      }

      this.author = await this.auth.get_displayname_or_email(
        this.recipe.author
      );

      if (!this.setup) this.setup = true;
    });
  }
}
