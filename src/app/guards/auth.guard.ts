import { Injectable, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check the use is logged In or not
    if (
      sessionStorage.getItem('isAuthenticated') == null ||
      sessionStorage.getItem('isAuthenticated') == undefined ||
      sessionStorage.getItem('isAuthenticated') == 'false'
    ) {
      return false;
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  }
}
