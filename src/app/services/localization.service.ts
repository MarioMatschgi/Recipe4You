import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import * as data_en from '../../lang/english.json';
import * as data_de from '../../lang/german.json';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  data: typeof data_en;
  langs: { [lang: string]: typeof data_en } = {};

  constructor() {
    let lang: string = window.navigator.language.substr(0, 2);
    if (!environment.production) lang = 'de';

    this.langs['en'] = this.getLangData(data_en);
    this.langs['de'] = this.getLangData(data_de);

    this.data = this.langs[lang] || this.langs['en'];
  }

  getLangData(data) {
    return {
      ...this.langs['en'],
      ...(data as any).default,
    };
  }
}
