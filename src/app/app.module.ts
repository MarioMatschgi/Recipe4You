import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileBookmarksComponent } from './components/profile/profile-bookmarks/profile-bookmarks.component';
import { HomeComponent } from './components/home/home.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { NotFoundGeneralComponent } from './components/not-found/not-found-general/not-found-general.component';
import { NotFoundRecipeComponent } from './components/not-found/not-found-recipe/not-found-recipe.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeIngredientsListComponent } from './components/recipe/recipe-ingredients-list/recipe-ingredients-list.component';
import { RecipesListComponent } from './components/recipes/recipes-list/recipes-list.component';
import { RecipePreviewComponent } from './components/recipe/recipe-preview/recipe-preview.component';
import { RecipesViewComponent } from './components/recipes/recipes-view/recipes-view.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { AuthenticationModule } from './libraries/authentication/authentication.module';
import { PopoverModule } from './libraries/popover/popover.module';
import { ShareButtonsModule } from './libraries/share-buttons/share-buttons.module';
import { ThemesModule } from './libraries/themes/themes.module';
import { UtilModule } from './libraries/util/util.module';
import { ProfileStarsComponent } from './components/profile/profile-stars/profile-stars.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileSettingsComponent } from './components/profile/profile-settings/profile-settings.component';
import { RecipeBaseComponent } from './components/recipe/recipe-base/recipe-base.component';
import { RecipeDeleteComponent } from './components/recipe/recipe-delete/recipe-delete.component';
import { RecipeComponent } from './components/recipe/recipe.component';

@NgModule({
  declarations: [
    /* COMPONENTS-GENERAL */
    AppComponent,
    HomeComponent,
    MenubarComponent,

    /* NOT-FOUND */
    NotFoundComponent,
    NotFoundGeneralComponent,
    NotFoundRecipeComponent,

    /* RECIPE */
    RecipeComponent,
    RecipesViewComponent,
    RecipeBaseComponent,
    RecipeEditComponent,
    RecipeDeleteComponent,
    RecipeCreateComponent,
    RecipePreviewComponent,

    /* RECIPES */
    RecipesComponent,
    RecipesViewComponent,
    RecipesListComponent,
    RecipeIngredientsListComponent,

    /* PROFILE */
    ProfileComponent,
    ProfileSettingsComponent,
    ProfileStarsComponent,
    ProfileBookmarksComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:2500',
    }),

    /* LIBRARIES */
    UtilModule,
    PopoverModule,
    AuthenticationModule,
    ShareButtonsModule,
    ThemesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
