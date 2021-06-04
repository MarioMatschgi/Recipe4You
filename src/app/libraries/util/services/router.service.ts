import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Location } from '@angular/common';

export enum RouterUrls {
  home = '',

  recipes = 'recipes',

  recipe_edit = 'recipe/edit',
  recipe_delete = 'recipe/delete',
  recipe_create = 'recipe/create',

  profile_settings = 'profile/settings',
  profile_creations = 'profile/creations',
  profile_stars = 'profile/stars',
  profile_bookmarks = 'profile/bookmarks',
}

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  k_loc = 'router.loc';
  loaded = false;
  get_url(url: RouterUrls, params: string[] = []): string {
    return '/' + url + '/' + params.join('/');
  }
  get_url_arr(url: RouterUrls, params: string[] = []): string[] {
    return url.split('/').concat(params);
  }

  constructor(public router: Router, public location: Location) {
    if (window.matchMedia('(display-mode: standalone)').matches)
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

  nav(url: RouterUrls, params: string[] = []) {
    this.router.navigate(this.get_url_arr(url, params));
  }

  nav_old() {
    const url = localStorage.getItem(this.k_loc);
    if (url) this.router.navigate([url]);
  }

  nav_backward() {
    this.location.back();
  }
  nav_forward() {
    this.location.forward();
  }

  // TODO: URL GO THERE AFTER LOGIN
  nav_login() {
    this.router.navigate(['auth/login']);
  }
  // TODO: NAV BACK
  nav_login_back() {
    this.router.navigate(['']);
  }
  // TODO: URL GO THERE AFTER REGISTER
  nav_register() {
    this.router.navigate(['auth/register']);
  }
  nav_verify_email() {
    this.router.navigate(['auth/verify-email']);
  }
}
