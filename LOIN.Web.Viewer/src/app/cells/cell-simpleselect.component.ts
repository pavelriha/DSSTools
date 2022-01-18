import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

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
          <option *ngFor="let o of desc.properties[item.name].options" [value]="o.id">{{o.name}}</option>
        </select>
    </div>
  </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellSimpleSelectComponent extends MadTableCell implements OnInit {

  //constructor() { super(); }

  ngOnInit(): void {
  }

  public getValue() {
    let value = this.desc.properties[this.item.name].options.find(x => x.id === this.data[this.item.name] ).name;
    if (!value) return this.data[this.item.name];
    return value;
  }

}
