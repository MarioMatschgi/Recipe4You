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
  ingredients: RecipeIngredientData[] = [];
  method: string;
  notes?: string;
  images?: string[];
}
export class RecipeIngredientData {
  name: string;
  amount: number;
  unit: string;
}
export class RecipeHelper {
  static lang: string;

  static to_object(r: RecipeModel): Object {
    return JSON.parse(JSON.stringify(r));
  }
  static getData(r: RecipeModel) {
    if (r.langs[this.lang]) return r.langs[this.lang];
    else if (r.langs['en']) return r.langs['en'];

    for (const key in r.langs) {
      return r.langs[key];
    }
  }
}
