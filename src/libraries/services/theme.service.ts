import { Injectable } from '@angular/core';
import { ThemeModel } from '../models/theme.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private tran;
  themes: ThemeModel[] = [
    new ThemeModel('Sky&shy;blue', '#6cdbeb'),
    new ThemeModel('Tomato&shy;red', '#eb6c6c'),
    new ThemeModel('Pink', '#df6ceb'),
    new ThemeModel('Purple', '#7b6ceb'),
    new ThemeModel('Sea&shy;blue', '#6c8ceb'),
    new ThemeModel('Turqouse', '#6ceba6'),
    new ThemeModel('Green', '#6ceb71'),
    new ThemeModel('Banana&shy;yellow', '#d6eb6c'),
    new ThemeModel('Orange', '#ebae6c'),
  ];

  constructor(public auth: AuthService) {
    const body = this.get_el('body');
    this.tran = getComputedStyle(body).getPropertyValue(
      '--tran-background-color'
    );
    body.style.setProperty('transition', 'none');

    this.auth.sub_userPrivateData(() => {
      this.switch_theme(
        this.themes[
          this.auth.userPrivateData.theme < this.themes.length
            ? this.auth.userPrivateData.theme
            : 0
        ],
        false
      );
    });
  }
  private get_el(nam: string): HTMLElement {
    return document.querySelector(nam) as HTMLElement;
  }

  switch_theme(theme: ThemeModel, save: boolean = true) {
    this.get_el(':root').style.setProperty('--color-background', theme.color);
    setTimeout(() => {
      this.get_el('body').style.setProperty('transition', this.tran);
    });

    if (save) {
      this.auth.userPrivateData.theme = this.themes.indexOf(theme);
      this.auth.doc_userPrivate.set(
        { theme: this.auth.userPrivateData.theme },
        { merge: true }
      );
    }
  }
}
