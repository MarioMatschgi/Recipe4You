import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { LocalizationService } from 'src/app/libraries/services/localization.service';
import { RouterService } from 'src/app/libraries/services/router.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
