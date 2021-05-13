import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'recipe-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  @Input('recipes') recipes;
  @Input('async') async: boolean;

  constructor() {}

  ngOnInit(): void {}
}
