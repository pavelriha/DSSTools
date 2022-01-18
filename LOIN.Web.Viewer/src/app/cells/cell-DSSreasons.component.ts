import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';
import { ControlService } from '../shared/services/control.service';

@Component({
  template: `
  <ng-container *ngIf="!edit || desc.properties[item.name]?.read_only ; else editform">
  <ng-container *ngIf="data[item.name]">
    <div *ngFor="let r of data[item.name].split(',')"> {{ getName(r) }} </div> 
  </ng-container>
  </ng-container>
  <ng-template #editform >
    <div class="form-group">
        editace uziti neni zatim podporovana
    </div>
  </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDssReasonsComponent extends MadTableCell implements OnInit {

  constructor(
    public controlService: ControlService,
  ) { super(); }

  ngOnInit(): void {
  }

  getName(uuid) {

    if (this.controlService.reasons) for (let i=0; i< this.controlService.reasons.length; i++) {
      if (this.controlService.reasons[i].uuid==uuid) return this.controlService.reasons[i].nameCS;
    }
    return uuid;
  }

}
