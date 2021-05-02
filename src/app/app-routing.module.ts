import { EditComponent } from './components/recipe/edit/edit.component';
import { DeleteComponent } from './components/recipe/delete/delete.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* RECIPE */
  { path: 'recipe/edit/:id', component: EditComponent },
  { path: 'recipe/delete/:id', component: DeleteComponent },
  { path: 'recipe/create/new', component: CreateComponent },
  { path: 'recipe/create', redirectTo: 'recipe/create/new' },

  /* RECIPES */
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },

  /* BOOKMARKS */
  { path: 'bookmarks', component: BookmarksComponent },

  /* AUTH */
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  /* NOT FOUND */
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
