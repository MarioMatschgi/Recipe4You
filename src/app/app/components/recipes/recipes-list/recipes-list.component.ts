import { Component, Input, OnInit } from '@angular/core';
import { LoadService } from 'src/app/libraries/loading/services/load.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
})
export class RecipesListComponent implements OnInit {
  @Input('recipes') recipes;
  @Input('async') async: boolean;

  constructor(public loader: LoadService) {}

  ngOnInit(): void {
    this.loader.load('recipes/list');
  }
}
