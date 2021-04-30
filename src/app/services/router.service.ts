import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(public router: Router, public location: Location) {}

  nav_home() {
    this.router.navigate(['']);
  }

  nav_backward() {
    this.location.back();
  }
  nav_forward() {
    this.location.forward();
  }

  nav_login() {
    this.router.navigate(['login']);
  }

  nav_recipe(id: string) {
    this.router.navigate(['recipes', id]);
  }
  nav_edit(id: string) {
    this.router.navigate(['recipe', 'edit', id]);
  }
  nav_delete(id: string) {
    this.router.navigate(['recipe', 'delete', id]);
  }
  nav_create() {
    this.router.navigate(['recipe', 'create']);
  }
}
