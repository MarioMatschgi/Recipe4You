import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/libraries/authentication/services/auth.service';
import { LocalizationService } from 'src/app/libraries/util/services/localization.service';
import { RouterService } from 'src/app/libraries/util/services/router.service';

@Component({
  selector: 'auth-base',
  templateUrl: './auth-base.component.html',
  styleUrls: ['./auth-base.component.scss'],
})
export class AuthBaseComponent implements OnInit {
  @Input() type: 'login' | 'register' | 'verify' | 'reset';

  email_data = { email: '', password: '', confirm_password: '' };

  constructor(
    public auth: AuthService,
    public local: LocalizationService,
    public router: RouterService
  ) {}

  ngOnInit(): void {
    if (this.auth.loggedIn) {
      this.router.nav('home');
      return;
    }
  }

  submit_email(form: NgForm) {
    form.form.markAllAsTouched();

    // IF FORM INVALID RETURN
    if (!form.valid) return;

    if (this.type == 'login' || this.type == 'verify') {
      this.auth.signIn_email(this.email_data.email, this.email_data.password);
    } else if (this.type == 'register') {
      this.auth.signUp_email(
        this.email_data.email,
        this.email_data.password,
        this.email_data.confirm_password
      );
    }
  }
  resend_verification_email() {
    this.auth
      .send_verification_mail()
      .then(() => {
        confirm(this.local.data.auth.verify_email.successfully_send);
      })
      .catch((err) => {
        if (err.code == 'auth/too-many-requests')
          err.code = 'auth/too-many-verify-email';
        this.auth.error = err;
      });
  }
}