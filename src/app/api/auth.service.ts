import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalHelpers } from '../helpers/GlobalHelpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

  login(email: string): void {
    this.cookieService.set(GlobalHelpers.COOKIENAME, JSON.stringify({email}), 1, "/");
    this.router.navigate(['/home']);
  }

  logout() {
    this.cookieService.delete(GlobalHelpers.COOKIENAME);
    this.router.navigate(['/login']);
  }
}