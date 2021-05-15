export const emptyRecipeModel: RecipeModel = {
  id: '',

  langs: {},

  author: '',
  date_added: null,
  date_edited: null,
};
export class RecipeModel {
  id: string;

  langs: { [lang: string]: RecipeData };

  author: string; // UUID FOR AUTHENTICATED USER

  date_added: Date;
  date_edited: Date;
}
export class RecipeData {
  name: string;
  description: string;
  ingredients: string;
  method: string;
  notes?: string;
  images?: string[];
}
export class RecipeHelper {
  static lang: string;

  static to_object(r: RecipeModel): Object {
    return JSON.parse(JSON.stringify(r));
  }
  static getData(r: RecipeModel) {
    return r.langs[this.lang];
  }
}
