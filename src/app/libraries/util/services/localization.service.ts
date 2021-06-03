import { RecipeHelper } from 'src/app/model/recipe.model';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import * as data_en from '../../../../lang/english.json';
import * as data_de from '../../../../lang/german.json';
import { AuthService } from '../../authentication/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  lang: string;
  data: typeof data_en;
  langs: { [lang: string]: typeof data_en } = {};
  lang_list: string[];

  constructor(public auth: AuthService) {
    this.langs['en'] = this.getLangData(data_en);
    this.langs['de'] = this.getLangData(data_de);
    this.lang_list = Object.keys(this.langs);

    this.auth.sub_userPrivateData(() => {
      this.update_lang(this.get_lang());
    });
  }

  update_lang(lang: string) {
    this.lang = lang;
    RecipeHelper.lang = this.lang;

    this.data = this.langs[this.lang] || this.langs['en'];
  }

  get_lang() {
    let lang = this.auth.userPrivateData?.lang;

    if (!lang || lang == '' || lang == 'auto')
      lang = window.navigator.language.substr(0, 2);

    return lang;
  }

  getLangData(data) {
    return {
      ...this.langs['en'],
      ...(data as any).default,
    };
  }
}
