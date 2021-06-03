import { ThemeService } from '../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ThemeModel } from 'src/app/libraries/models/theme.model';
import { LocalizationService } from 'src/app/libraries/services/localization.service';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';

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
    this.auth.sub_userPrivateData(() => {
      this.lang = this.auth.userPrivateData?.lang;
      this.change_lang(false);
    });
  }

  ngOnInit(): void {}

  change_lang(save: boolean = true) {
    this.local.update_lang(this.lang);

    if (save) {
      this.auth.doc_userPrivate.set({ lang: this.lang }, { merge: true });
    }
  }
}
