import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor() { }

// Subject muze byt producent i konzument dat.
  // mohli bychom se hlasit (subscribe) rovnou k nemu, ale to by musel byt public a byla by k dispozici i jeho .next() metoda, tudiz moznost jak zvenci emitovat data, coz asi principialne nechceme, tak proto se asi pouziva druha prom, kde se "vyexportuje" jen samotna emise dat (.asObservable)
  // Tady to asi chceme
  //private controlSource = new BehaviorSubject<any>(false);
  public control = new BehaviorSubject<string>('subject_created');
  //public  controlLogged = this.controlSource.asObservable();

}
