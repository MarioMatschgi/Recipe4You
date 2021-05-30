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
  private m_urls: { [name: string]: string[] } = {
    home: [''],
    bookmarks: ['bookmarks'],
    stars: ['stars'],
    recipes: ['recipes'],
    recipe_edit: ['recipe', 'edit'],
    recipe_delete: ['recipe', 'delete'],
    recipe_create: ['recipe', 'create'],
    settings: ['settings'],
  };
  get_url_arr(name: string, params: string[] = []): string[] {
    return this.m_urls[name].concat(params);
  }
  get_url(name: string, params: string[] = []): string {
    return '/' + this.get_url_arr(name, params).join('/');
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

  nav(name: string, params: string[] = []) {
    this.router.navigate(this.get_url_arr(name, params));
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
    this.router.navigate(['login']);
  }
  // TODO: URL GO THERE AFTER REGISTER
  nav_register() {
    this.router.navigate(['register']);
  }
}
