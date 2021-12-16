import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtablecell.class';

@Component({
  template: `
  <ng-container *ngIf="!edit ; else editform">
  {{ data[item.name] }}
  </ng-container>
  <ng-template #editform >
    <div class="form-group">
      <input [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [readonly]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required">
    </div>
  </ng-template>
  `,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class MadTableCellRawValue extends MadTableCell {
        //this.changeDetectorRef.markForCheck();
}
