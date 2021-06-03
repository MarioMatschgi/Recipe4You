import { Component, OnInit } from '@angular/core';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

@Component({
  selector: 'not-found-recipe',
  templateUrl: './not-found-recipe.component.html',
  styleUrls: ['./not-found-recipe.component.scss'],
})
export class NotFoundRecipeComponent implements OnInit {
  constructor(public local: LocalizationService) {}

  ngOnInit(): void {}
}
