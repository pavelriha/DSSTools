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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TreeModule,
    AngularDropdownModule,
    ApiModule,//.forRoot({}),
    FormsModule,
    routing,
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
