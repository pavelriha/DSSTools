import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, OnChanges } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { MadTableCell } from '../madtable/madtablecell.class';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { IMultiSelectOption, IMultiSelectSettings } from 'ngx-bootstrap-multiselect';
import { JbzService } from '../jbz.service';

@Component({
  template: `
  <ng-container *ngIf="!edit ; else editform">
  {{ data[item.name] }}
  </ng-container>
  <ng-template #editform >
        <ngx-bootstrap-multiselect 
            *ngIf="desc.properties[item.name].options" 
            [name]="item.name" 
            [options]="desc.properties[item.name].options" 
            [settings]="mySettings"  
            [(ngModel)]="data[item.name]" 
        ></ngx-bootstrap-multiselect>
  </ng-template>
  `,
  styles: [
  ],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellMultiSelectComponent extends MadTableCell implements OnChanges, OnInit {

    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        showCheckAll: false,
        showUncheckAll: true,
        //checkedStyle: 'glyphicon', //'checkboxes', 'glyphicon' or 'fontawesome'
        //buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 10,
        //displayAllSelectedText: true
    };
    
    
  constructor(
    private JbzService: JbzService,
    private changeDetectorRef: ChangeDetectorRef,
  ) { super(); }

  ngOnInit(): void {
      //console.log('multi started', this.desc.properties[this.item.name].options);
  }
  ngOnChanges() {
    //console.log('multi ngOnChanges', this.edit);
    this.paramChange();
  }

  paramChange() {
      let name = this.item.name;
      if ( this.edit &&  this.desc.properties[name].optionsUrl ) {
          console.log('multi - loading options from '+this.desc.properties[name].optionsUrl);
          this.JbzService.getData(this.desc.properties[name].optionsUrl)
            .subscribe(res => {
                this.desc.properties[name].options = [];
                res['data'].forEach((o:any) => {
                    this.desc.properties[name].options.push({ id: o.jbnumber, name: o.jbnumber+' '+o.title });
                });
                this.changeDetectorRef.detectChanges(); // bez toho to haze chybu "Expression has changed after it was checked."
            });
      }
  }

/*
  private _edit: string;
  get edit(): string { return this._edit; }
  set edit(newVal: string) {
    if (this._edit === newVal) { return; }
    this._edit = newVal;

    console.log('multi prop set!', newVal, this.edit);
    this.paramChange();
    //this.onChanges();  // instead of ngOnChanges
  }
  */
  
}
