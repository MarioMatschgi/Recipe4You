import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/libraries/services/auth.service';
import { LocalizationService } from 'src/libraries/services/localization.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public auth: AuthService, public local: LocalizationService) {}

  ngOnInit(): void {}
}
