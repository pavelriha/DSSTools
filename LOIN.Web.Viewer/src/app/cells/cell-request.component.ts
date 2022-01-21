import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';
import { ActivatedRoute, Router  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//import { JbzService } from '../jbz.service';

@Component({
  template: `
    <a  (click)="request(item, data);" [ngClass]="[
        'actions__item', 
        item.icon ? 'zmdi zmdi-'+item.icon : ''
        ]">
    {{ data[item.name] }}                          
    </a>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellRequestComponent extends MadTableCell implements OnInit {

  @Input() loading: boolean;
  
  constructor(
    //private JbzService: JbzService,
    public router: Router,
    public route: ActivatedRoute,
    private http: HttpClient,
  ) { super(); }

  ngOnInit(): void {
  }
  
  request(c, data) {
    console.log('request fired');

      if (!c.url) {
          console.error('[madtable/request] url not defined');
          return;
      }
      this.loading = true;
      
      const url = c.url.replace( /{(\w+)}/g, (all, holder) => data[holder] || all );

      console.log(url);

     


      //this.JbzService.postData(url, null).subscribe(
      this.http.get(url).subscribe(
        d => { 
            this.loading = false;
            if (c.redirect) this.router.navigate([c.redirect], { relativeTo: this.route });
            else            this.reload();
        },
        r => { this.loading = false; },
	  );
  }
  
}
