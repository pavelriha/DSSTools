import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <ng-container *ngIf="!edit ; else editform">
          {{ data[desc.properties[item.name].name] }}
          <br>
          <span class="uuid">{{ data[desc.properties[item.name].uuid] }}</span>
      </ng-container>
      <ng-template #editform >
        <div class="form-group">
          <input [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [disabled]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required">
        </div>
      </ng-template>
  `,
  styles: [
    '.uuid { font-size: 80%; color: #aaa; }'
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellNameUuidComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
