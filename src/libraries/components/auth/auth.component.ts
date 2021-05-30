import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/libraries/services/auth.service';
import { LocalizationService } from 'src/libraries/services/localization.service';
import { RouterService } from 'src/libraries/services/router.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @Input() type: 'login' | 'register' | 'reset';

  email_data = { email: '', password: '', confirm_password: '' };

  constructor(
    public auth: AuthService,
    public local: LocalizationService,
    public router: RouterService
  ) {}

  ngOnInit(): void {}

  submit_email(form: NgForm) {
    form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!form.valid) return;

    if (this.type == 'login') {
      this.auth.signIn_email(this.email_data.email, this.email_data.password);
    } else if (this.type == 'register') {
      this.auth.signUp_email(
        this.email_data.email,
        this.email_data.password,
        this.email_data.confirm_password
      );
    }
  }
}
