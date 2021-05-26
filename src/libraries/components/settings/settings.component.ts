import { ThemeService } from './../../services/theme.service';
import { Component, OnInit } from '@angular/core';
import { ThemeModel } from 'src/libraries/models/theme.model';
import { LocalizationService } from 'src/libraries/services/localization.service';

@Component({
  selector: 'settings-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(public local: LocalizationService, public ts: ThemeService) {}

  ngOnInit(): void {}
}
