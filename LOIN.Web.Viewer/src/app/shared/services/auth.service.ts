// aby slo neco pouzit z http interceptoru, tak to nesmi mit zavislost na http, proto extra dedikovana service

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Subject muze byt producent i konzument dat.
  // mohli bychom se hlasit (subscribe) rovnou k nemu, ale to by musel byt public a byla by k dispozici i jeho .next() metoda, tudiz moznost jak zvenci emitovat data, coz asi principialne nechceme, tak proto se asi pouziva druha prom, kde se "vyexportuje" jen samotna emise dat (.asObservable)
  private userSource = new BehaviorSubject<any>(false);
  public  userLogged = this.userSource.asObservable();


  constructor() { 
  }

  getUser() {
    return this.userSource.value;
  }
  setUser(userdata) {
    this.userSource.next(userdata);
  }
  clearUser(): void {
	  this.userSource.next(false);
  }


}
