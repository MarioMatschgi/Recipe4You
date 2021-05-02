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

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  col_recipes: AngularFirestoreCollection<any>;
  col_usersPrivate: AngularFirestoreCollection<any>;
  col_usersPublic: AngularFirestoreCollection<any>;

  // doc_userPrivate: AngularFirestoreDocument<any>;
  // doc_userPublic: AngularFirestoreDocument<any>;

  constructor(public db: AngularFirestore) {
    this.col_recipes = this.db.collection('recipes');
    this.col_usersPrivate = this.db.collection('users-private');
    this.col_usersPublic = this.db.collection('users-public');

    // const uid = this.auth.userPublicData.uid;
    // this.doc_userPrivate = this.col_usersPrivate.doc(uid);
    // this.doc_userPublic = this.col_usersPublic.doc(uid);
  }

  get_all_recipes(): Observable<RecipeModel[]> {
    return this.col_recipes.valueChanges();
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
      .collection('recipes', (ref) => ref.where('name', '==', name))
      .get()
      .toPromise();

    if (!a.docs[0]) return null;

    return a.docs[0].data() as RecipeModel;
  }
}
