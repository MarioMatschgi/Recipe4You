export class RecipeModel {
  name: string;
  description: string;
  ingredients: string;
  method: string;
  notes?: string;
  images?: string[];

  author: string; // UUID FOR AUTHENTICATED USER

  date_added: Date;
  date_edited: Date;
}

export class RecipeHelper {
  static to_object(r: RecipeModel): Object {
    return JSON.parse(JSON.stringify(r));
  }
}
