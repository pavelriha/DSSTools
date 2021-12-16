import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//import { Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';
//import { Subscriber } from 'rxjs/Subscriber';
//import { of } from 'rxjs/observable/of';
import { Observable, Subscriber, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//import { BsModalService } from 'ngx-bootstrap/modal';
//import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
//import { MadModalComponent } from './mad-modal.component';



@Injectable()
export class MadService {
  private url1 = '/api/list.php';
  public token: string;
  //private messageSource = new BehaviorSubject<string>("default message");
  //currentMessage = this.messageSource.asObservable();
  //changeMessage(message: string) {
  //  this.messageSource.next(message)
  //}
  //modalErrorRef: BsModalRef;


  constructor(
    private http: HttpClient,
	//private router: Router,
	//private modalService: BsModalService,
  ) { 
    // v servise to nevadi, zde muzem v konstruktoru vykonavat vetsi veci (naopak nejde zde ngOnInit)
	// no ale nemuzem volat z konstruktoru metody teto tridy, takze to musime presunout jinam
  }


  makeUrl(path) {
    if (path.startsWith('/')) {
	  return path;
	} else {
	  return (this.url1+'/'+path);
	}
  }


  getDataDescription(path): Observable<any> {
    return this.http.options<any>(this.makeUrl(path))
	  .pipe(
	    //tap(heroes => console.log('fetched getDataDescription for '+url)),
		//catchError(this.handleError('getDataDescription', []))
	  );
  }

  getData (url, per_page, page, sort, filter ): Observable<any> {
	//console.log('madservice.getData() called for url='+url+' perpage='+per_page+' page='+page);
	let params = new HttpParams()
	  .set('per_page', per_page)
	  .set('page', page);
	if (sort) {
	  params = params.set('sort[]', sort);
	}
	if (filter) {
	  filter.forEach((f:any) => {
	    if (f.type && f.type == 'qs') {
		  params = params.set(f.colname, f.filterstring);
		} else {
		  // Django
	      //params = params.set('filter{'+f.colname+'.icontains}', f.filterstring); 
		  // PHP
	      params = params.set('filter['+f.colname+'.icontains]', f.filterstring); 
		}
	  });
	}

    return this.http.get(this.makeUrl(url), { params: params} )
	  .pipe(
	    //tap(heroes => this.log(`fetched heroes`)),
	    //tap(heroes => console.log('fetched url='+url+' perpage='+per_page+' page='+page)),
		//catchError(this.handleError('getData', []))
	  );
  }

  getDataRaw(url:string): Observable<any> {
    return this.http.get(this.makeUrl(url) )
	  .pipe(
	    //tap(heroes => console.log('fetched url='+url)),
		//catchError(this.handleError('getDataRaw', []))
	  );
  }



  sendData (url, data ): Observable<any> {
	//console.log('madservice.sendData() called for url='+url);

    return this.http.patch(this.makeUrl(url),data  )
	  .pipe(
	    tap(heroes => console.log(`data send`)),
		//catchError(this.handleError('SendData', []))
	  );
  }
  sendDataPost (url, data ): Observable<any> {
	//console.log('madservice.sendDataPost() called for url='+url);

    return this.http.post(this.makeUrl(url),data  )
	  .pipe(
	    tap(d => console.log(`data send`)),
		//catchError(this.handleError('SendData', []))
	  );
  }
  submit( isnew, url, data): Observable<any> {
    if (isnew)
	  return this.sendDataPost(url, data);
	else
      return this.sendData(url, data);
  }


  sendDelete(url): Observable<any> {
    //console.log('madservice.sendDelete() called for url='+url);
	return this.http.delete(this.makeUrl(url) );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
	  console.error("[handleError] chyba pri "+operation+".  result:"+result);
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      //return of(result as T);
	  return Observable.throw(error);
    };
  }



  getBlob(url: string): Observable<any> {
      return new Observable((observer: Subscriber<any>) => {
          let objectUrl: string = null;

          //presunuto primo do secure.pipe tady to vadi kdyz to ma byt univerzalni pro jiny ucel
          //observer.next('');//aby to nenacitalo /frontend/null nez se mu tam poslou ziskana data, coz chvilku trva
 
          this.http
              .get(url, {
                  responseType: 'blob'
              })
              .subscribe(m => {
                  objectUrl = URL.createObjectURL(m);
                  observer.next(objectUrl);
              });
 
          return () => {
              if (objectUrl) {
                  URL.revokeObjectURL(objectUrl);
                  objectUrl = null;
              }
          };
      });
  }

  popupHttpError(r) {
    //this.modalErrorRef = this.modalService.show(MadModalComponent, {initialState: {response: r} });
	  console.error('[MadService]',r);
  }
  popupError(e) {
    //this.modalErrorRef = this.modalService.show(MadModalComponent, {initialState: e });
	  console.error('[MadService]',e);
  }





}
