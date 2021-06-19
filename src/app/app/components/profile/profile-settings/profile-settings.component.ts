import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { ThemesService } from 'src/app/libraries/themes/services/themes.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';

@Component({
  selector: 'profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  lang;

  constructor(
    public local: LocalizationService,
    public ts: ThemesService,
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
