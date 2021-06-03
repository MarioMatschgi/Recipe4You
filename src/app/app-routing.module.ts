import { ProfileSettingsComponent } from './components/profile/profile-settings/profile-settings.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBookmarksComponent } from './components/profile/profile-bookmarks/profile-bookmarks.component';
import { NotFoundGeneralComponent } from './components/not-found/not-found-general/not-found-general.component';
import { AuthLoginGuard } from './libraries/authentication/guards/auth-login.guard';
import { AuthComponent } from './libraries/authentication/components/auth.component';
import { AuthLoginComponent } from './libraries/authentication/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './libraries/authentication/components/auth-register/auth-register.component';
import { AuthVerifyEmailComponent } from './libraries/authentication/components/auth-verify-email/auth-verify-email.component';
import { ProfileStarsComponent } from './components/profile/profile-stars/profile-stars.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDeleteComponent } from './components/recipe/recipe-delete/recipe-delete.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesViewComponent } from './components/recipes/recipes-view/recipes-view.component';

const routes: Routes = [
  /* HOME */
  { path: '', component: HomeComponent },

  /* RECIPES */
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [{ path: ':id', component: RecipesViewComponent }],
  },

  /* RECIPE */
  {
    path: 'recipe',
    component: RecipeComponent,
    children: [
      { path: 'edit/:id', component: RecipeEditComponent },
      { path: 'delete/:id', component: RecipeDeleteComponent },
      { path: 'create', redirectTo: 'create/new' },
      { path: 'create/new', component: RecipeCreateComponent },
    ],
    canActivate: [AuthLoginGuard],
  },

  /* PROFILE: user own stuff */
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'settings', component: ProfileSettingsComponent },
      { path: 'stars', component: ProfileStarsComponent },
      { path: 'bookmarks', component: ProfileBookmarksComponent },
    ],
    canActivate: [AuthLoginGuard],
  },

  /* AUTH: authentication stuff */
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

  /* NOT FOUND */
  { path: '**', component: NotFoundGeneralComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
