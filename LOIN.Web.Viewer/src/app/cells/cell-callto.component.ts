import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <ng-container *ngIf="!edit ; else editform">
          <a [href]=" 'tel:' + data[ item.name ] ">{{ data[ item.name ] }}</a>
      </ng-container>
      <ng-template #editform >
        <div class="form-group">
          <input type="tel" [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [readonly]="desc.properties[item.name]?.read_only">
        </div>
      </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellCallToComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
