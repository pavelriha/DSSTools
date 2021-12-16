import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

@Component({
  template: ` 
      <ng-container *ngIf="!edit ; else editform">
          <a [href]=" 'mailto:' + data[ item.name ] ">{{ data[ item.name ] }}</a>
      </ng-container>
      <ng-template #editform >
        <div class="form-group">
          <input type="email" email [name]="item.name" [(ngModel)]="data[item.name]" class="form-control" [readonly]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required">
        </div>
      </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellEmailComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

}
