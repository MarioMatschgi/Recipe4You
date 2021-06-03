import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDeleteComponent } from './components/recipe/recipe-delete/recipe-delete.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from './libraries/components/auth/auth-login/auth-login.component';
import { AuthRegisterComponent } from './libraries/components/auth/auth-register/auth-register.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { NotFoundGeneralComponent } from './components/not-found/not-found-general/not-found-general.component';
import { StarsComponent } from './components/stars/stars.component';
import { SettingsComponent } from 'src/app/libraries/components/settings/settings.component';
import { AuthVerifyEmailComponent } from 'src/app/libraries/components/auth/auth-verify-email/auth-verify-email.component';
import { AuthLoginGuard } from 'src/app/libraries/authentication/guards/auth-login.guard';
import { AuthComponent } from 'src/app/libraries/components/auth/auth.component';

const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* RECIPES */
  { path: 'recipes', component: RecipesComponent },
  { path: 'recipes/:id', component: RecipeViewComponent },

  /* RECIPE */
  {
    path: 'recipe/edit/:id',
    component: RecipeEditComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'recipe/delete/:id',
    component: RecipeDeleteComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'recipe/create/new',
    component: RecipeCreateComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'recipe/create',
    redirectTo: 'recipe/create/new',
  },

  /* BOOKMARKS */
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthLoginGuard],
  },

  /* STARS */
  { path: 'stars', component: StarsComponent, canActivate: [AuthLoginGuard] },

  /* AUTH */
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: AuthLoginComponent },
      { path: 'register', component: AuthRegisterComponent },
      { path: 'verify-email', component: AuthVerifyEmailComponent },
    ],
    canActivate: [AuthLoginGuard],
    data: { inverted: true },
  },

  /* SETTINGS */
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthLoginGuard],
  },

  /* NOT FOUND */
  { path: '**', component: NotFoundGeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
