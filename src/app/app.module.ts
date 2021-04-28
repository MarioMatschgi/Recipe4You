import { RecipeComponent } from './components/recipe/recipe.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { CreateComponent } from './components/recipe/create/create.component';
import { EditComponent } from './components/recipe/edit/edit.component';
import { DeleteComponent } from './components/recipe/delete/delete.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeViewComponent } from './components/recipes/recipe-view/recipe-view.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    NotFoundComponent,
    HomeComponent,
    CreateComponent,
    EditComponent,
    DeleteComponent,
    RecipesComponent,
    RecipeViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
