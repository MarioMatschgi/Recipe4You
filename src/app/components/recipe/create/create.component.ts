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
}
