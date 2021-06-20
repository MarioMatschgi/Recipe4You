import { ProfileSettingsComponent } from './app/components/profile/profile-settings/profile-settings.component';
import { HomeComponent } from './app/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBookmarksComponent } from './app/components/profile/profile-bookmarks/profile-bookmarks.component';
import { NotFoundGeneralComponent } from './app/components/not-found/not-found-general/not-found-general.component';
import { AuthLoginGuard } from './libraries/authentication/guards/auth-login.guard';
import { AuthComponent } from './libraries/authentication/components/auth.component';
import { AuthLoginComponent } from './libraries/authentication/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from './libraries/authentication/components/auth-register/auth-register.component';
import { AuthVerifyEmailComponent } from './libraries/authentication/components/auth-verify-email/auth-verify-email.component';
import { ProfileStarsComponent } from './app/components/profile/profile-stars/profile-stars.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { RecipeComponent } from './app/components/recipe/recipe.component';
import { RecipeEditComponent } from './app/components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDeleteComponent } from './app/components/recipe/recipe-delete/recipe-delete.component';
import { RecipeCreateComponent } from './app/components/recipe/recipe-create/recipe-create.component';
import { RecipesComponent } from './app/components/recipes/recipes.component';
import { RecipesViewComponent } from './app/components/recipes/recipes-view/recipes-view.component';
import { ProfileCreationsComponent } from './app/components/profile/profile-creations/profile-creations.component';
import { AuthResetComponent } from './libraries/authentication/components/auth-reset/auth-reset.component';

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
      { path: 'creations', component: ProfileCreationsComponent },
      { path: 'stars', component: ProfileStarsComponent },
      { path: 'bookmarks', component: ProfileBookmarksComponent },
    ],
    canActivate: [AuthLoginGuard],
  },

  /* USER: user info stuff */
  // {
  //   path: 'user',
  //   component: ,
  //   children: [
  //     { path: ':id', component: }
  //   ]
  // }

  /* AUTH: authentication stuff */
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: AuthLoginComponent },
      { path: 'register', component: AuthRegisterComponent },
      { path: 'verify-email', component: AuthVerifyEmailComponent },
      { path: 'reset-password', component: AuthResetComponent },
    ],
    canActivate: [AuthLoginGuard],
    data: { inverted: true },
  },

  /* NOT FOUND */
  { path: '**', component: NotFoundGeneralComponent },
];

/**
 * Module for Angular Routing
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
