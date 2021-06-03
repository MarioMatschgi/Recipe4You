import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  @Input('recipes') recipes;
  @Input('async') async: boolean;

  constructor() {}

  ngOnInit(): void {}
}
