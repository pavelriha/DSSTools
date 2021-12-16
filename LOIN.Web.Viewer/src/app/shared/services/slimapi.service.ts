import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlimapiService {

  private baseUrl: string = '/slimapi'

  constructor(
    private http: HttpClient,
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

}
