import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { TreeModule } from '@circlon/angular-tree-component';
import { AngularDropdownModule } from 'angular-dropdown';



import { AppComponent } from './app.component';
import { ApiModule } from './swagger/api.module';

import { Configuration } from './swagger/configuration';
import { FilterBoxComponent } from './filter-box/filter-box.component';
import { BreakdownRequirementsComponent } from './breakdown-requirements/breakdown-requirements.component';
import { BreakdownRequirementsPopupComponent } from './breakdown-requirements/popup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AppRootComponent } from './app-root.component';
import { routing } from './app.routing';
import { FooterComponent } from './footer/footer.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ReqNotesComponent } from './notes/req-notes/req-notes.component';
import { ReqBtnComponent } from './notes/req-btn/req-btn.component';
import { ReqPopupComponent } from './notes/req-popup/req-popup.component';
import { MadTableModule } from './madtable/madtable.module';
import { CellDefaultComponent } from './cells/cell-default.component';
import { cell_type_map } from './cells/cells.module';
import { WorkplaceComponent } from './workplace/workplace.component';
import { NotesWorkplaceComponent } from './workplace/notes-workplace/notes-workplace.component';
import { NgWormholeModule } from 'ng-wormhole';
import { TodoComponent } from './todo/todo.component';
import { DtNewReqComponent } from './notes/dt-new-req/dt-new-req.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DtNewComponent } from './notes/dt-new/dt-new.component';


function getConfig() {
  return new Configuration({
      //basePath: "https://localhost:5001", 
      basePath: ' ', // mezera! bez ni to nejak zprasi a nelogicky posila na 0.0.0.0/
  });
}



@NgModule({
  declarations: [
    AppComponent,
    FilterBoxComponent,
    BreakdownRequirementsComponent,
    BreakdownRequirementsPopupComponent,
    PageNotFoundComponent,
    LoginComponent,
    AppRootComponent,
    FooterComponent,
    UserPanelComponent,
    ReqNotesComponent,
    ReqBtnComponent,
    ReqPopupComponent,
    WorkplaceComponent,
    NotesWorkplaceComponent,
    TodoComponent,
    DtNewReqComponent,
    DtNewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule,
    AngularDropdownModule,
    ApiModule,//.forRoot({}),
    FormsModule,
    NgSelectModule,
    routing,
    NgWormholeModule,
    MadTableModule.forRoot({
      paging: [ 5, 10, 20, 50],
      //per_page: 10,
      cell_type_default_component: CellDefaultComponent,
      cell_type_map: cell_type_map,
      mdWrapperClass: '',//'table-responsive',
      mdTableClass: 'table table-sm mb-0',
      //getDetail: jbz.test,
      //getData: loadContext,
      //getDetail: loadContext(),
  }),
  ],
  providers: [

    {
      provide: Configuration,
      useFactory: getConfig,
      //deps: MyAuthService,
      multi: false
  }
  ],
  bootstrap: [AppRootComponent] //predelano na AppRootComponent aby se na AppComponent nemuselo radsi sahat
})
export class AppModule { }
