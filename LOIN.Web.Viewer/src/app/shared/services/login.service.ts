import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SlimapiService } from './slimapi.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
  ) { 

    this.http.get<any>(this.slimapi.makeUrl("login")).subscribe({
        next: r => {
            //console.log(r);
            this.authService.setUser(r.data);
        }
    });

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
