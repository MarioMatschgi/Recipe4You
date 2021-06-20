import { Component, Input, OnInit } from '@angular/core';
import { isObservable } from 'rxjs';
import { LoadService } from 'src/app/libraries/loading/services/load.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  loader_id = 'recipes/list';

  m_recipes;
  get recipes() {
    return this.m_recipes;
  }
  @Input('recipes') set recipes(recipes) {
    this.m_recipes = recipes;

    if (isObservable(recipes)) {
      recipes.subscribe((res) => {
        if (res) this.loader.unload(this.loader_id);
      });
    } else {
      if (recipes) this.loader.unload(this.loader_id);
    }
  }
  @Input('async') async: boolean;

  constructor(public loader: LoadService) {}

  ngOnInit(): void {
    this.loader.load(this.loader_id);
  }
}
