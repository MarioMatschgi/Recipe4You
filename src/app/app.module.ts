import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RecipeComponent } from './components/recipe/recipe.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { RecipeCreateComponent } from './components/recipe/recipe-create/recipe-create.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDeleteComponent } from './components/recipe/recipe-delete/recipe-delete.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { RecipePreviewComponent } from './components/recipe/recipe-list/recipe-preview/recipe-preview.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { ClickOutsideDirective } from './libraries/directives/click-outside.directive';
import { ClickInsideOutsideDirective } from './libraries/directives/click-inside-outside.directive';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { NotFoundGeneralComponent } from './components/not-found/not-found-general/not-found-general.component';
import { NotFoundRecipeComponent } from './components/not-found/not-found-recipe/not-found-recipe.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { StarsComponent } from './components/stars/stars.component';
import { RecipeIngredientsListComponent } from './components/recipe/recipe-ingredients-list/recipe-ingredients-list.component';
import { PopoverComponent } from './libraries/components/popover/popover.component';
import { ShareButtonsComponent } from './libraries/components/share-buttons/share-buttons.component';
import { SettingsComponent } from './libraries/components/settings/settings.component';
import { ThemeService } from 'src/app/libraries/services/theme.service';
import { AuthenticationModule } from './libraries/authentication/authentication.module';

@NgModule({
  declarations: [
    /* DIRECTIVES */
    ClickOutsideDirective,
    ClickInsideOutsideDirective,

    /* COMPONENTS-GENERAL */
    AppComponent,

    RecipeComponent,
    NotFoundComponent,
    HomeComponent,
    RecipeCreateComponent,
    RecipeEditComponent,
    RecipeDeleteComponent,
    RecipesComponent,
    RecipeViewComponent,
    RecipePreviewComponent,
    MenubarComponent,
    BookmarksComponent,
    NotFoundGeneralComponent,
    NotFoundRecipeComponent,
    RecipeListComponent,
    StarsComponent,
    RecipeIngredientsListComponent,
    PopoverComponent,
    ShareButtonsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:2500',
    }),

    /* AUTH */
    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
