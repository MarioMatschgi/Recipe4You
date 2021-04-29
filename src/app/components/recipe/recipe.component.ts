import { DatabaseService } from './../../services/database.service';
import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  @Input('type') type: 'create' | 'edit' | 'delete';

  recipe: RecipeModel;

  constructor(
    private db: DatabaseService,
    private router: RouterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setup();
  }

  async setup() {
    if (this.type == 'create') {
      this.recipe = new RecipeModel();
    } else if (this.type == 'edit' || this.type == 'delete') {
      const params = await this.route.params.pipe(take(1)).toPromise();

      this.recipe = await this.db
        .get_recipe(params['id'])
        .pipe(take(1))
        .toPromise();
    }
  }

  async onSubmit(form: NgForm) {
    form.form.markAllAsTouched();

    if (form.valid) {
      if (this.type == 'create') {
        let recipe = await this.db.recipe_exists(this.recipe.name);
        if (!recipe) {
          this.recipe.date_added = new Date();
          this.recipe.date_edited = this.recipe.date_added;
          const doc = await this.db.add_recipe(this.recipe);

          this.recipe.id = doc.id;
          await this.db.edit_recipe(doc.id, this.recipe);

          this.router.nav_recipe(doc.id);
        }
      } else if (this.type == 'edit') {
        this.recipe.date_edited = new Date();

        await this.db.edit_recipe(this.recipe.id, this.recipe);
        this.router.nav_recipe(this.recipe.id);
      } else if (this.type == 'delete') {
        if (confirm('Are you sure you want to delete the recipe?')) {
          this.db.remove_recipe(this.recipe.id);
          this.router.nav_home();
        }
      }
    }
  }
}
