import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: boolean = false;
  @ViewChild('loginform') loginform: NgForm;
  userdata:any = null;
  private usersub: any;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
      this.usersub = this.authService.userLogged.subscribe(ud => this.userdata = ud);
  }

  onSubmit() {
    this.error = false;
    if (this.loginform.invalid) {
        // direktiva co nam nastavuje BS error classy, tak pracuje s !touched a neumim to tam dat jeste dle submited, takze zatim jedine reseni je udelat vsem touch 
        this.loginform.form.markAllAsTouched();
        return false;
    }
    
    this.loginService.userLogin(this.loginform.value).subscribe(
        r => {
            console.log('LOGIN successful for '+r.data.username);
            this.loginform.resetForm();
        },
        e => { 
            this.error = true;
        }
    );
  }
  
  logout() {
      this.loginService.userLogout();
  }
  
  ngOnDestroy() {
    this.usersub.unsubscribe();
  }
}
