import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <ng-container *ngIf="!edit ; else editform">
          <span class="float-right">{{ data[item.name] | number:'1.2-2' }}</span>
      </ng-container>
      <ng-template #editform >
        <div class="form-group">
          <input type="number" step="0.01" [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [readonly]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required">
        </div>
      </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDecimalComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
