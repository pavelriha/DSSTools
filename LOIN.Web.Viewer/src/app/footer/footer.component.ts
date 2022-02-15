import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
//import { LoginService } from '../shared/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private usersub: any;
  public userdata: any = false;
  public environment: any  = environment;

  constructor(
    private authService: AuthService,
    //private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.usersub = this.authService.userLogged.subscribe(ud => this.userdata = ud);
  }

  ngOnDestroy() {
    this.usersub.unsubscribe();
  }

  // public logout() {
  //   this.loginService.userLogout();
  // }

}
