import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterUrls } from '../models/router.model';

/**
 * Service for Routing
 */
@Injectable({
  providedIn: 'root',
})
export class RouterService {
  /**
   * Key for router location in localStorage
   */
  private k_loc = 'router.loc';

  /**
   * Whether the page was loaded
   */
  private loaded = false;

  /**
   * Returns the url for the given RouterUrl and the params
   * @param url The RouterUrl
   * @param params The params
   * @returns Returns the url for the given RouterUrl and the params
   */
  get_url(url: RouterUrls, params: string[] = []): string {
    return '/' + url + '/' + params.join('/');
  }

  /**
   * Returns the url as an array for the given RouterUrl and the given params
   * @param url The RouterUrl
   * @param params The params
   * @returns Returns the url as an array for the given RouterUrl and the given params
   */
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

  /**
   * Navigates to the given RouterUrl and the given params
   * @param url
   * @param params
   */
  nav(url: RouterUrls, params: string[] = []) {
    this.router.navigate(this.get_url_arr(url, params));
  }

  /**
   * Navigates to the page of the previous session
   */
  private nav_old() {
    const url = localStorage.getItem(this.k_loc);
    if (url) this.router.navigate([url]);
  }

  /**
   * Navigates backwards
   */
  nav_backward() {
    this.location.back();
  }

  /**
   * Navigates forwards
   */
  nav_forward() {
    this.location.forward();
  }

  // TODO: URL GO THERE AFTER LOGIN
  /**
   * Navigates to the login page
   */
  nav_login() {
    this.router.navigate(['auth/login']);
  }

  // TODO: NAV BACK
  /**
   * Navigates to the page before the login page
   */
  nav_login_back() {
    this.router.navigate(['']);
  }

  // TODO: URL GO THERE AFTER REGISTER
  /**
   * Navigates to the register page
   */
  nav_register() {
    this.router.navigate(['auth/register']);
  }
  // TODO: URL GO THERE AFTER REGISTER
  /**
   * Navigates to the reset password page
   */
  nav_reset() {
    this.router.navigate(['auth/reset-password']);
  }
  // TODO: URL GO THERE AFTER VERIFY
  /**
   * Navigates to the verify email page
   */
  nav_verify_email() {
    this.router.navigate(['auth/verify-email']);
  }
}
