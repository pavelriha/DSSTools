import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  private usersub: any;
  public userdata: any = false;
  
  constructor(
    private loginService: LoginService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.usersub = this.authService.userLogged.subscribe(ud => this.userdata = ud);
  }

  ngOnDestroy() {
    this.usersub.unsubscribe();
  }

  public logout() {
    if (confirm("Opravdu se chcete odhlásit?")) {
      console.log('logout call');
      this.loginService.userLogout();
    }
  }

}
