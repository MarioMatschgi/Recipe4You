import { DatabaseService } from './../../../services/database.service';
import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'recipe-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  recipe: RecipeModel;

  constructor(private db: DatabaseService, private router: RouterService) {}

  ngOnInit(): void {
    this.recipe = new RecipeModel();
  }

  async onSubmit(form: NgForm) {
    form.form.markAllAsTouched();

    if (form.valid) {
      let recipe = await this.db.recipe_exists(this.recipe.name);
      if (!recipe) {
        this.recipe.date_added = new Date();
        this.recipe.date_edited = this.recipe.date_added;
        const doc = await this.db.add_recipe(this.recipe);

        this.router.nav_recipe(doc.id);
      }
    }
  }
}
