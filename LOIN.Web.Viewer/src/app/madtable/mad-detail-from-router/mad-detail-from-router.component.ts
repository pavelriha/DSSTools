import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-mad-detail-from-router',
  templateUrl: './mad-detail-from-router.component.html',
  styleUrls: ['./mad-detail-from-router.component.scss']
})
export class MadDetailFromRouterComponent implements OnInit {
    
  @ViewChild('tableref') tableref: any;
  private paramSub: any;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

    
  ngOnInit(): void {
    this.data = this.route.snapshot.data;
    this.paramSub = this.route.params.subscribe(params => {
        //if (!this.data.conf.url && this.data.conf.baseurl) <-- CHYBA nastavena url zustava perzistentne i pri dalsim vstupu do komponenty a ID se pak nezmeni!!!
        if (this.data.conf.baseurl) {
            // pokud neni ID v param, tak prohledame parent routy
            if (!params['id']) {
                params = {};
                var route = this.router.routerState.snapshot.root;
                do {
                    Object.assign(params,route.params); 
                    route = route.firstChild;
                } while(route);
            }
            this.data.conf.url = this.data.conf.baseurl.replace('{id}',+params['id']);
        }
        //this.tableref?.reload();
        this.tableref?.ngOnChanges(); // zmenili jsme parametry, ale uvnitr objektu, cehoz si detector nevsimne
    });
  }
  
  ngOnDestroy() {
    //this.paramsub.unsubscribe();
    this.paramSub.unsubscribe();
  }

  finish(res) {
      let url: string;
      //console.log('MAD end res=', res);
      if (res) url = this.data.conf.onSuccessUrl;
        else   url = this.data.conf.onCancelUrl;
      //console.log(url);
      if (url) this.router.navigate([url], { relativeTo: this.route });
  } 

}
