import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequirementsService } from 'src/app/swagger';
import { Requirement } from 'src/app/swagger';

@Injectable({
  providedIn: 'root'
})
export class SlimapiService {

  private baseUrl: string = '/slimapi'

  constructor(
    private http: HttpClient,
    private requirementsService: RequirementsService
  ) { }

  makeUrl(path) {
    //console.log(path);
    if (path.startsWith('/')) {
      return path;
    } else {
      return (this.baseUrl+'/'+path);
    }
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



  getRequirements(): Observable<Array<Requirement>> {
    return this.requirementsService.apiRepositoryIdRequirementsGet("latest");
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
