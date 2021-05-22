import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/libraries/services/auth.service';
import { LocalizationService } from '../../../services/localization.service';
import { RouterService } from '../../../services/router.service';

@Component({
  selector: 'auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss'],
})
export class AuthProfileComponent implements OnInit {
  popover: boolean;

  constructor(
    public auth: AuthService,
    public router: RouterService,
    public local: LocalizationService
  ) {}

  ngOnInit(): void {}
}
