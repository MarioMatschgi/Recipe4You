import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import {
  RouterService,
  RouterUrls,
} from 'src/app/libraries/util/services/router.service';

@Component({
  selector: 'auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
})
export class AuthProfileComponent implements OnInit {
  RouterUrls = RouterUrls;
  popover: boolean;

  constructor(
    public auth: AuthService,
    public router: RouterService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {}
}
