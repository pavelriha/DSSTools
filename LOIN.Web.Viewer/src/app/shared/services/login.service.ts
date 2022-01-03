import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, share, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SlimapiService } from './slimapi.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private init: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
  ) {  }

  // z authGuard budem volat toto a ne primo authService.getUser()
  // asi to jde udelat cele nejak lepe
  // ale jinak tahle fce resi to, aby sla zavolat vickrat PARALELNE ale ten http request se provedl jen jednou
  getUserObservable: Observable<any>;
  getUser(): Observable<any> {
    if (this.init) return of(this.authService.getUser());

    if (this.getUserObservable) return this.getUserObservable;
    this.getUserObservable = this.http.get<any>(this.slimapi.makeUrl("login")).pipe(
      map( user => { 
        //console.log("loginService, map", user);
        this.authService.setUser(user.data);
        this.init = true;
        return user.data;
      }),
      share(), // udelej z observable multicast (aka subject), at se k nemu muze pripojit vic konzumentu soucasne. Jinak to sice "jde" taky ale provadi se to duplicitne
    );
    return this.getUserObservable;    
  }

  userLogin(formdata): Observable<any> {
    return this.http.post(this.slimapi.makeUrl("login"), formdata).pipe(tap(
            r => {
                console.log('login OK', r);
                this.authService.setUser(r.data);
                this.router.navigate(['/']);
                // let return_url: string = this.route.snapshot.queryParamMap.get('returnUrl');
                // console.log('login returl=', return_url);
                // if (return_url) this.router.navigate([return_url], { relativeTo: this.route } );                  
            }
        )
    );
  }

  userLogout() {
    this.http.get( this.slimapi.makeUrl('logout') ).subscribe(
          r => {
              this.authService.clearUser();
              console.log('LOGOUT');
              this.router.navigate(['/']);
          },
          e => { console.error('LOGOUT FAILED'); }
    );
  }



}
