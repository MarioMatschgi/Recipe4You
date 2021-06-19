import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import {
  RecipeData,
  RecipeHelper,
  RecipeModel,
} from 'src/app/app/model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  path_recipes = 'recipes';

  col_recipes: AngularFirestoreCollection<any>;
  col_usersPrivate: AngularFirestoreCollection<any>;
  col_usersPublic: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
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

  get_recipes_for(user_id: string) {
    return this.db
      .collection(this.path_recipes, (ref) =>
        ref.where('author', '==', user_id)
      )
      .get();
  }

  get_recipe(id: string): Observable<RecipeModel> {
    return this.col_recipes.doc(id).valueChanges();
  }

  add_recipe(data: RecipeModel): Promise<DocumentReference<any>> {
    data = this.trim_recipe(data);

    return this.col_recipes.add(RecipeHelper.to_object(data));
  }

  edit_recipe(id: string, newData: RecipeModel) {
    newData = this.trim_recipe(newData);

    this.col_recipes.doc(id).set(RecipeHelper.to_object(newData));
  }

  remove_recipe(id: string) {
    this.col_recipes.doc(id).delete();
  }

  trim_recipe(data: RecipeModel): RecipeModel {
    let newLangs: { [lang: string]: RecipeData } = {};
    for (const key of Object.keys(data.langs)) {
      if (data.langs[key].ingredients?.length <= 0)
        delete data.langs[key].ingredients;

      if (
        key != 'auto' &&
        data.langs[key] &&
        Object.keys(data.langs[key]).length > 0
      )
        newLangs[key] = data.langs[key];
    }

    data.langs = newLangs;

    return data;
  }
}
