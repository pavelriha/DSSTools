import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';
import { SlimapiService } from '../shared/services/slimapi.service';
import { CellSimpleSelectComponent } from './cell-simpleselect.component';

@Component({
  template: `
  <ng-container *ngIf="!edit ; else editform">
    {{ getValue() }}
  </ng-container>
  <ng-template #editform >
    <div class="form-group">
        <select class="custom-select" [name]="item.name" [(ngModel)]="data[item.name]" 
            [disabled]="desc.properties[item.name]?.read_only" [required]="desc.properties[item.name]?.required"
        >
          <option *ngFor="let o of datatypes" [value]="o.id_datatype">{{o.datatype_cs}}</option>
        </select>
    </div>
  </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellDSSdatatypeComponent extends CellSimpleSelectComponent implements OnInit {

  public datatypes: any = [];

  constructor(
    private slimapi: SlimapiService,
  ) { super(); }

  ngOnInit(): void {
    this.slimapi.getDatatype().subscribe({
      next: (types) => this.datatypes = types.data
    })
  }


}
