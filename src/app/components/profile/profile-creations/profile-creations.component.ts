import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';

@Component({
  selector: 'profile-creations',
  templateUrl: './profile-creations.component.html',
  styleUrls: ['./profile-creations.component.scss'],
})
export class ProfileCreationsComponent implements OnInit {
  recipes: Observable<RecipeModel[]>;

  constructor() {}

  ngOnInit(): void {}
}
