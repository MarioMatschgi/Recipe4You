export class RecipeModel {
  name: string;
  description: string;
  ingredients: string;
  method: string;
  notes?: string;
  images?: string[];

  date_added: Date;
  date_edited: Date;

  // constructor(
  //   name?: string,
  //   description?: string,
  //   ingredients?: string,
  //   method?: string,
  //   notes?: string,
  //   images?: string[],
  //   date_added?: Date,
  //   date_edited?: Date
  // ) {
  //   this.name = name;
  //   this.description = description;
  //   this.method = method;
  //   this.notes = notes;
  //   this.images = images;

  //   this.date_added = date_added;
  //   this.date_edited = date_edited;
  // }

  to_object(): Object {
    return JSON.parse(JSON.stringify(this));
  }
}
