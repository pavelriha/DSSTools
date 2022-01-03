import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';

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
    this.loginService.getUser().subscribe();//vynutime nacteni user dat (overeni zda je user prihlasenej)
  }

}
