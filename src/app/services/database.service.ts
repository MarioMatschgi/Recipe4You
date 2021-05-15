import { LocalizationService } from 'src/app/services/localization.service';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecipeHelper, RecipeModel } from '../model/recipe.model';
import { AuthService } from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  path_recipes = 'recipes';

  col_recipes: AngularFirestoreCollection<any>;
  col_usersPrivate: AngularFirestoreCollection<any>;
  col_usersPublic: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore, private local: LocalizationService) {
    this.col_recipes = this.db.collection(this.path_recipes);
    this.col_usersPrivate = this.db.collection('users-private');
    this.col_usersPublic = this.db.collection('users-public');
  }

  get_all_recipes(): Observable<RecipeModel[]> {
    return this.col_recipes.valueChanges();
  }

  get_recipes(arr: string[]) {
    for (let i = 0; i < arr.length; i++)
      if (!arr[i] || arr[i] == '') arr.splice(i, 1);

    return this.db
      .collection(this.path_recipes, (ref) =>
        ref.where(firebase.default.firestore.FieldPath.documentId(), 'in', arr)
      )
      .get();
  }

  get_recipe(id: string): Observable<RecipeModel> {
    return this.col_recipes.doc(id).valueChanges();
  }

  add_recipe(data: RecipeModel): Promise<DocumentReference<any>> {
    return this.col_recipes.add(RecipeHelper.to_object(data));
  }

  edit_recipe(id: string, newData: RecipeModel) {
    this.col_recipes.doc(id).set(RecipeHelper.to_object(newData));
  }

  remove_recipe(id: string) {
    this.col_recipes.doc(id).delete();
  }

  async recipe_exists(name: string): Promise<RecipeModel> {
    let a = await this.db
      .collection(this.path_recipes, (ref) => ref.where('name', '==', name))
      .get()
      .toPromise();

    if (!a.docs[0]) return null;

    return a.docs[0].data() as RecipeModel;
  }
}
