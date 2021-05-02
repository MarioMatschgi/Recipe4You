import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { RecipeComponent } from './components/recipe/recipe.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { DeleteComponent } from './components/recipe/delete/delete.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeViewComponent } from './components/recipe/recipe-view/recipe-view.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { PreviewComponent } from './components/recipe/preview/preview.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/auth/profile/profile.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

@NgModule({
  declarations: [
    AppComponent,
    ClickOutsideDirective,
    RecipeComponent,
    NotFoundComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    RecipesComponent,
    RecipeViewComponent,
    PreviewComponent,
    MenubarComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BookmarksComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
