import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RequirementsService } from 'src/app/swagger';
import { Requirement } from 'src/app/swagger';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root'
})
export class SlimapiService {

  private baseUrl: string = '/slimapi'

  constructor(
    private http: HttpClient,
    private requirementsService: RequirementsService,
    public controlService: ControlService,
  ) { }

  makeUrl(path) {
    //console.log(path);
    if (path.startsWith('/')) {
      return path;
    } else {
      return (this.baseUrl+'/'+path);
    }
  }

  passwd(oldPasswd, newPassword): Observable<any> {
    return this.http.post(this.makeUrl('passwd'), { old_password: oldPasswd, new_password: newPassword } );
  }

  notesReqInsert(form): Observable<any> {
    return this.http.post(this.makeUrl('notes/req'), form);
  }
  
  notesReqViewer(milestone, uuids): Observable<any> {
    return this.http.post(this.makeUrl('notes/req/viewer/'+milestone), uuids);
  }
  
  notesDtInsert(form): Observable<any> {
    return this.http.post(this.makeUrl('notes/dt'), form);
  }

  requirementsInsert(form): Observable<any> {
    return this.http.post(this.makeUrl('requirements'), form);
  }

  getDatatype(): Observable<any> {
    return this.http.get(this.makeUrl('datatype?per_page=999'));
  }

  getRequirements(): Observable<Array<Requirement>> {
    return forkJoin([
      this.requirementsService.apiRepositoryIdRequirementsGet(this.controlService.selectedRepository),
      <Observable<Requirement[]>>this.http.get(this.makeUrl('requirements/viewer')),
    ]).pipe(
      map( ([r1 , r2 ]) => {
        //console.log(r1, r2);
        r2.forEach( r => r['_class']="proposal" );
        r1.push(...r2);
        //console.log('final Req', r1);
        return r1;
      })
    );


  }

  getNewDataTemplates(id_offset): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'DSS-DT-ID-OFFSET':  String(id_offset),
      })
    };
    return this.http.get(this.makeUrl('notes/dt/viewer'), httpOptions );
  }


}
