import { Component, OnInit } from '@angular/core';

type Recipe = {
  name: string;
  description: string;
  ingredients: string; // TODO: ARR OF INGREDIENTS OBJECTS
  method: string;
  notes?: string;
};

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {
  data: Recipe;

  constructor() {
    this.data = {
      name: 'Pfannkuchen',
      description: 'Lecker lecker palatschinken! beschte Essen LOOOL',
      ingredients: 'Mehl, Eier, Milch, ...',
      method: 'Alles zusammenmixen!',
      notes: 'LOL, wenn du das verkackts, ne?? :kek:',
    };
  }

  ngOnInit(): void {}
}
