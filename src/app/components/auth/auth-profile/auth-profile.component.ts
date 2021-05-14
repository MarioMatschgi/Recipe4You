import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalizationService } from 'src/app/services/localization.service';
import { RouterService } from 'src/app/services/router.service';

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
