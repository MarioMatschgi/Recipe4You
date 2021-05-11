export const emptyRecipeModel: RecipeModel = {
  id: '',
  name: '',
  description: '',
  ingredients: '',
  method: '',
  author: '',
  date_added: null,
  date_edited: null,
};
export class RecipeModel {
  id: string;

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
