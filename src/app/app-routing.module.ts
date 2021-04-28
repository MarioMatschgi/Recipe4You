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
  { path: '', component: HomeComponent },
  {
    path: 'recipe',
    component: RecipeComponent,
    children: [
      { path: 'edit/:name', component: EditComponent },
      { path: 'delete/:name', component: DeleteComponent },
      { path: 'create', redirectTo: 'create/new' },
      { path: 'create/new', component: CreateComponent },
    ],
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [{ path: ':name', component: RecipeViewComponent }],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
