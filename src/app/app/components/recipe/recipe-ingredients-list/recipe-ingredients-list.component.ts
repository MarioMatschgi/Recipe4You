import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

import { RecipeIngredientData } from 'src/app/app/model/recipe.model';

@Component({
  selector: 'recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.scss'],
})
export class RecipeIngredientsListComponent implements OnInit {
  @Input() type: 'read' | 'write';
  @Input() ingredients: RecipeIngredientData[];
  @Output() ingredientsChange = new EventEmitter<RecipeIngredientData[]>();

  constructor(public local: LocalizationService) {}

  ngOnInit(): void {
    if (!this.ingredients) this.ingredients = [new RecipeIngredientData()];
  }

  delete_ingredient(i: number) {
    this.ingredients.splice(i, 1);
    this.ingredientsChange.emit(this.ingredients);
  }

  add_ingredient() {
    this.ingredients.push(new RecipeIngredientData());
    this.ingredientsChange.emit(this.ingredients);
    setTimeout(() => {
      const ing = document.getElementById(
        'ing-' + (this.ingredients.length - 1)
      );
      console.log((ing.firstChild as HTMLInputElement).focus());
    });
  }
}
