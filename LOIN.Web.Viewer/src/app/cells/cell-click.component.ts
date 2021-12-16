import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `<a class="actions__item zmdi zmdi-{{item.icon}}" (click)="item.click( data );"></a>`,
  styles: [],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellClickComponent extends MadTableCell implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {}

}
