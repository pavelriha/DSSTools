import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Actor, BreakdownItem, Milestone, Reason } from 'src/app/swagger';
import { contextCol } from '../contextCol';

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


  public selectedRepository: string;

  public nodesBreakdown: BreakdownItem[];
  public nodesActors: Actor[];
  public nodesMilestones: Milestone[];
  public nodesReasons: Reason[];

  // az Martin upravi API tak se tohle bude muset predelat, aby to vracelo jen vybrane volby
  public getContextColActor(): contextCol[] {
    let cols: contextCol[] = [];
    this.nodesActors.forEach(     n => { cols.push(    { id: n.id, name: n.nameCS }); });
    return cols;
  }
  public getContextColMilestone(): contextCol[] {
    let cols: contextCol[] = [];
    this.nodesMilestones.forEach(     n => { cols.push(    { id: n.id, name: n.nameCS }); });
    return cols;
  }
  public getContextColReason(): contextCol[] {
    let cols: contextCol[] = [];
    this.nodesReasons.forEach(     n => { cols.push(    { id: n.id, name: n.nameCS }); });
    return cols;
  }
  public contextCheck(colId: number, context: any[]): boolean {
    for (let i = 0; i<context.length; i++) {
      if (context[i].id == colId) return true; 
    }
    return false;
  }

}
