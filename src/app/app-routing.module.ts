import { EditComponent } from './components/recipe/edit/edit.component';
import { DeleteComponent } from './components/recipe/delete/delete.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { RecipeViewComponent } from './components/recipes/recipe-view/recipe-view.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

  /* NOT FOUND */
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
