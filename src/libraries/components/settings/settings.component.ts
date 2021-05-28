import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ThemeModel } from 'src/libraries/models/theme.model';
import { LocalizationService } from 'src/libraries/services/localization.service';
import { AuthService } from 'src/libraries/services/auth.service';

@Component({
  selector: 'settings-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  lang;

  constructor(
    public local: LocalizationService,
    public ts: ThemeService,
    public auth: AuthService
  ) {
    this.lang = auth.userPrivateData.lang;
  }

  ngOnInit(): void {}

  change_lang() {
    this.auth.doc_userPrivate.set({ lang: this.lang }, { merge: true });
    this.local.update_lang(this.lang);
  }
}
