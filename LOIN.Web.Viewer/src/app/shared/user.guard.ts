import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //if (this.authService.getUser()) return true;
      //return this.loginService.getUser(); // Observable
      return this.loginService.getUser().pipe(
        //tap( u => console.log('UserGuard, tap', u)),
        map( user => {if (user) return true; else return this.router.parseUrl('/login');})
      );
      
      //console.info('userGuard failed');
      //return this.router.parseUrl('/login');

  }
  
}
