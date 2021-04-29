import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private location: Location) {}

  nav_home() {
    this.router.navigate(['']);
  }

  nav_backward() {
    this.location.back();
  }
  nav_forward() {
    this.location.forward();
  }

  nav_recipe(id: string) {
    this.router.navigate(['recipes', id]);
  }
  nav_edit(id: string) {}
  nav_delete(id: string) {}
  nav_create() {
    this.router.navigate(['recipe', 'create']);
  }
}
