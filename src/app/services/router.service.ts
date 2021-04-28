import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  nav_recipe(id: string) {
    this.router.navigate(['recipes', id]);
  }
}
