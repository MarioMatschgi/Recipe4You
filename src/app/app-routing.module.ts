import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDeleteComponent } from './components/recipe/recipe-delete/recipe-delete.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../libraries/components/auth/auth-login/auth-login.component';
import { RegisterComponent } from '../libraries/components/auth/auth-register/auth-register.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { NotFoundGeneralComponent } from './components/not-found/not-found-general/not-found-general.component';
import { StarsComponent } from './components/stars/stars.component';

const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* RECIPE */
  { path: 'recipe/edit/:id', component: RecipeEditComponent },
  { path: 'recipe/delete/:id', component: RecipeDeleteComponent },
  { path: 'recipe/create/new', component: RecipeCreateComponent },
  { path: 'recipe/create', redirectTo: 'recipe/create/new' },

  /* RECIPES */
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },

  /* BOOKMARKS */
  { path: 'bookmarks', component: BookmarksComponent },

  /* STARS */
  { path: 'stars', component: StarsComponent },

  /* AUTH */
  { path: 'login', component: AuthLoginComponent },
  { path: 'register', component: RegisterComponent },

  /* NOT FOUND */
  { path: '**', component: NotFoundGeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
