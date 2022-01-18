import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: `
      <ng-container *ngIf="!edit ; else editform">
        <div class="textarea">
          {{ data[item.name] }}
        </div>
      </ng-container>
      <ng-template #editform >
        <div class="form-group">
          <textarea [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [disabled]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required">
          </textarea>
        </div>
      </ng-template>
  `,
  styles: [
    '.textarea { white-space: pre-line; }'
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellTextareaComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
