import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';
import { AuthService } from 'src/libraries/services/auth.service';
import { RouterService } from 'src/libraries/services/router.service';
import { DatabaseService } from 'src/libraries/services/database.service';
import { LocalizationService } from 'src/libraries/services/localization.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  recipes: Observable<RecipeModel[]>;

  constructor(
    public router: RouterService,
    public db: DatabaseService,
    private auth: AuthService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {
    this.recipes = this.db.get_all_recipes();
  }
}
