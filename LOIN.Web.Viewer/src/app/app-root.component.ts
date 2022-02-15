import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.component.html',
  styles: [
  ]
})
export class AppRootComponent implements OnInit {

  constructor(
    private loginService: LoginService, 
  ) { }

  ngOnInit(): void {
    if (environment.login) this.loginService.getUser().subscribe();//vynutime nacteni user dat (overeni zda je user prihlasenej)
  }

}
