import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <ng-container *ngIf="!edit ; else editform">
          <i class="zmdi" [ngClass]="{'zmdi-check': data[item.name], 'zmdi-close': !data[item.name]}"></i>
      </ng-container>
      
      <ng-template #editform >
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" [id]="item.name" [name]="item.name" [(ngModel)]="data[item.name]" [readonly]="desc.properties[item.name]?.read_only" >
           <label class="custom-control-label" [for]="item.name"></label>
        </div>
      </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellBoolComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
