import { LocalizationService } from './../../services/localization.service';
import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeModel } from 'src/app/model/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { RouterService } from 'src/app/services/router.service';

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
