import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/model/recipe.model';
import { NgForm } from '@angular/forms';
import { DatabaseService } from 'src/app/libraries/services/database.service';
import { RouterService } from 'src/app/libraries/services/router.service';

@Component({
  selector: 'recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.scss'],
})
export class RecipeCreateComponent implements OnInit {
  recipe: RecipeModel;

  constructor(private db: DatabaseService, private router: RouterService) {}

  ngOnInit(): void {
    this.recipe = new RecipeModel();
  }
}
