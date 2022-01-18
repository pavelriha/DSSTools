import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
//import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';

import { DjangoValueComponent } from '../madtable/django-value/django-value.component';

import { CellDefaultComponent } from './cell-default.component';
import { CellClickComponent } from './cell-click.component';
import { CellRouterLinkComponent } from './cell-routerlink.component';
import { CellHtmlLinkComponent } from './cell-htmllink.component';
//import { CellRequestComponent } from './cell-request.component';
import { CellEmailComponent } from './cell-email.component';
import { CellCallToComponent } from './cell-callto.component';
import { CellIntegerComponent } from './cell-integer.component';
import { CellDecimalComponent } from './cell-decimal.component';
import { CellBoolComponent } from './cell-bool.component';
import { CellDatetimeComponent } from './cell-datetime.component';
import { CellSimpleSelectComponent } from './cell-simpleselect.component';
//import { CellMultiSelectComponent } from './cell-multiselect.component';
import { CellPasswordComponent } from './cell-password.component';
import { CellDssReasonsComponent } from './cell-DSSreasons.component';
import { CellNameUuidComponent } from './cell-nameuuid.component';
import { CellTextareaComponent } from './cell-textarea.component';

@NgModule({
  declarations: [
    CellDefaultComponent,
    CellClickComponent,
    CellRouterLinkComponent,
    CellHtmlLinkComponent,
    //CellRequestComponent,
    CellEmailComponent,
    CellCallToComponent,
    CellIntegerComponent,
    CellDecimalComponent,
    CellBoolComponent,
    CellDatetimeComponent,
    CellSimpleSelectComponent,
    //CellMultiSelectComponent,
    CellPasswordComponent,
    CellDssReasonsComponent,
    CellNameUuidComponent,
    CellTextareaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    //NgxBootstrapMultiselectModule,
  ],
  exports: [
  ]
})
export class CellsModule { }


export const cell_type_map: any = {
    'integer':  CellIntegerComponent,//DjangoValueComponent,
    'decimal':  CellDecimalComponent,//DjangoValueComponent,
    'date':     DjangoValueComponent,
    'datetime': CellDatetimeComponent,//DjangoValueComponent,
    'one':      DjangoValueComponent,
    
    'simpleselect':   CellSimpleSelectComponent,
    //'multiselect':    CellMultiSelectComponent,
    'bool':     CellBoolComponent,
    'click':    CellClickComponent,
    'link':     CellRouterLinkComponent,
    'htmllink': CellHtmlLinkComponent,
    //'request':  CellRequestComponent,
    'email':    CellEmailComponent,
    'callto':   CellCallToComponent,
    'password': CellPasswordComponent,
    'textarea': CellTextareaComponent,

    'reasons':  CellDssReasonsComponent,
    'nameuuid': CellNameUuidComponent,
};