import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  k_loc = 'router.loc';
  loaded = false;

  constructor(public router: Router, public location: Location) {
    router.events.subscribe((e: Event) => {
      if (e instanceof NavigationEnd) {
        if (!this.loaded) {
          if (e.url == '/') this.nav_old();
          this.loaded = true;
        }
        localStorage.setItem(this.k_loc, e.url);
      }
    });
  }

  nav_old() {
    const url = localStorage.getItem(this.k_loc);
    if (url) this.router.navigate([url]);
  }

  nav_home() {
    this.router.navigate(['']);
  }

  nav_backward() {
    this.location.back();
  }
  nav_forward() {
    this.location.forward();
  }

  // TODO: URL GO THERE AFTER LOGIN
  nav_login() {
    this.router.navigate(['login']);
  }

  nav_bookmarks() {
    this.router.navigate(['bookmarks']);
  }

  nav_stars() {
    this.router.navigate(['stars']);
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
