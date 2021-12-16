import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <a [ngClass]="[
        'actions__item', 
        item.icon ? 'zmdi zmdi-'+item.icon : ''
        ]" [href]="item.url + data[ item.urlid || 'id']"></a>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellHtmlLinkComponent extends MadTableCell implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
  }

}
