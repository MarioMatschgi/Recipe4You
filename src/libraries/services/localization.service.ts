import { RecipeHelper } from 'src/app/model/recipe.model';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as data_en from '../../lang/english.json';
import * as data_de from '../../lang/german.json';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  lang: string;
  data: typeof data_en;
  langs: { [lang: string]: typeof data_en } = {};
  lang_list: string[];

  constructor() {
    this.lang = window.navigator.language.substr(0, 2);
    if (!environment.production) this.lang = 'de';
    RecipeHelper.lang = this.lang;

    this.langs['en'] = this.getLangData(data_en);
    this.langs['de'] = this.getLangData(data_de);

    this.lang_list = Object.keys(this.langs);

    this.data = this.langs[this.lang] || this.langs['en'];
  }

  getLangData(data) {
    return {
      ...this.langs['en'],
      ...(data as any).default,
    };
  }
}
