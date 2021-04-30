import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'auth-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  popover: boolean;

  constructor(public auth: AuthService, public router: RouterService) {}

  ngOnInit(): void {}
}