import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SlimapiService {

  private baseUrl: string = '/slimapi'

  constructor() { }

  makeUrl(path) {
    //console.log(path);
    if (path.startsWith('/')) {
      return path;
    } else {
      return (this.baseUrl+'/'+path);
    }
}

}
