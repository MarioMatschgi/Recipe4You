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
import { AppComponent } from './app/app.component';
import { ProfileBookmarksComponent } from './app/components/profile/profile-bookmarks/profile-bookmarks.component';
import { HomeComponent } from './app/components/home/home.component';
import { MenubarComponent } from './app/components/menubar/menubar.component';
import { NotFoundGeneralComponent } from './app/components/not-found/not-found-general/not-found-general.component';
import { NotFoundRecipeComponent } from './app/components/not-found/not-found-recipe/not-found-recipe.component';
import { NotFoundComponent } from './app/components/not-found/not-found.component';
import { RecipeCreateComponent } from './app/components/recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './app/components/recipe/recipe-edit/recipe-edit.component';
import { RecipeIngredientsListComponent } from './app/components/recipe/recipe-ingredients-list/recipe-ingredients-list.component';
import { RecipesListComponent } from './app/components/recipes/recipes-list/recipes-list.component';
import { RecipePreviewComponent } from './app/components/recipe/recipe-preview/recipe-preview.component';
import { RecipesViewComponent } from './app/components/recipes/recipes-view/recipes-view.component';
import { RecipesComponent } from './app/components/recipes/recipes.component';
import { AuthenticationModule } from './libraries/authentication/authentication.module';
import { PopoverModule } from './libraries/popover/popover.module';
import { ShareButtonsModule } from './libraries/share-buttons/share-buttons.module';
import { ThemesModule } from './libraries/themes/themes.module';
import { UtilModule } from './libraries/util/util.module';
import { ProfileStarsComponent } from './app/components/profile/profile-stars/profile-stars.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { ProfileSettingsComponent } from './app/components/profile/profile-settings/profile-settings.component';
import { RecipeBaseComponent } from './app/components/recipe/recipe-base/recipe-base.component';
import { RecipeDeleteComponent } from './app/components/recipe/recipe-delete/recipe-delete.component';
import { RecipeComponent } from './app/components/recipe/recipe.component';
import { ProfileCreationsComponent } from './app/components/profile/profile-creations/profile-creations.component';
import { LoadingModule } from './libraries/loading/loading.module';
import { StructureModule } from './libraries/structure/structure.module';

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
    ProfileCreationsComponent,
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
    LoadingModule,
    StructureModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
