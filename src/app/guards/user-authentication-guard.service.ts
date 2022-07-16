import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalHelpers } from '../helpers/GlobalHelpers';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationGuardService implements CanActivate {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const cookie = this.cookieService.get(GlobalHelpers.COOKIENAME);

      if (!cookie) {
        this.router.navigate(['/login']);
        return false;
      }

      const { email } = JSON.parse(cookie);

      if (!email || email !== "madhan@mail.com") {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
  }
}
