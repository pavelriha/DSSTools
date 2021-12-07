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
    private loginService: LoginService, //!!! toto tu musi byt, kdyz to explicitne nepouzivame, aby se sluzba nahodila a provedla login check v ramci construktoru
  ) { }

  ngOnInit(): void {
  }

}
