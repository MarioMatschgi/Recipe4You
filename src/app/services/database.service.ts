import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RecipeModel } from '../model/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  recipesCol: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.recipesCol = this.db.collection('recipes');
  }

  get_all_recipes(): Observable<RecipeModel[]> {
    return this.recipesCol.valueChanges();
  }

  get_recipe(id: string): Observable<RecipeModel> {
    return this.recipesCol.doc(id).valueChanges();
  }

  add_recipe(data: RecipeModel): Promise<DocumentReference<any>> {
    return this.recipesCol.add(data.to_object());
  }

  edit_recipe(id: string, newData: RecipeModel) {
    this.recipesCol.doc(id).set(newData.to_object());
  }

  remove_recipe(id: string) {
    this.recipesCol.doc(id).delete();
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
