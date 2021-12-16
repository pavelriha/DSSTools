import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgPipesModule } from 'ngx-pipes';

//import { MADTABLEINIT_CONFIG, MadTableInitConfig } from './madtable-init.config';
import { MADTABLEINIT_CONFIG } from './madtable-init.config';
import { MadMasterConfig } from './mad.types';
import { MadTableComponent } from './mad-table/mad-table.component';
import { MadDetailComponent } from './mad-detail/mad-detail.component';
import { DjangoValueComponent } from './django-value/django-value.component';
import { DjangoInputComponent } from './django-input/django-input.component';

import { MadService } from './mad.service';

// aby to bylo videt v jinem modulu (pro router) tak tu musi byt import a export
import { MadTableFromRouterComponent } from './mad-table-from-router/mad-table-from-router.component';
export { MadTableFromRouterComponent } from './mad-table-from-router/mad-table-from-router.component';
import { MadDetailFromRouterComponent } from './mad-detail-from-router/mad-detail-from-router.component';
export { MadDetailFromRouterComponent } from './mad-detail-from-router/mad-detail-from-router.component';

import { MadTableCellComponent } from './mad-table-cell/mad-table-cell.component';
import { MadTableCellRawValue } from './mad-table-cell/raw.component';

@NgModule({
  imports: [
    BrowserModule,
	FormsModule,
	PaginationModule.forRoot(),
	NgPipesModule,
    RouterModule,
  ],
  declarations: [
    MadTableComponent,
	MadDetailComponent,
	DjangoValueComponent,
	DjangoInputComponent,
	MadTableFromRouterComponent,
	MadTableCellComponent,
    MadTableCellRawValue,
    MadDetailFromRouterComponent,
  ],
  exports: [
    MadTableComponent,
	MadDetailComponent,
	//MadTableFromRouterComponent,
  ],
  providers: [
    MadService,
  ],
})
export class MadTableModule { 
    static forRoot(initConfig: MadMasterConfig): ModuleWithProviders<any> {
        return {
          ngModule: MadTableModule,
          providers: [
            {
              provide: MADTABLEINIT_CONFIG,
              useValue: initConfig
            }
          ]
        };
    }

}

