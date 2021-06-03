import { LocalizationService } from '../../../libraries/services/localization.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'not-found-recipe',
  templateUrl: './not-found-recipe.component.html',
  styleUrls: ['./not-found-recipe.component.scss'],
})
export class NotFoundRecipeComponent implements OnInit {
  constructor(public local: LocalizationService) {}

  ngOnInit(): void {}
}
