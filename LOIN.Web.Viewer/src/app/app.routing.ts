import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { RegNotesComponent } from './notes/reg-notes/reg-notes.component';



const ROUTES: Routes = [
    //{path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '', component: AppComponent},
    {path: 'login', component: LoginComponent},

    {path: 'notes', children: [
      {path: 'req', children: [
        { path: ':uuid', component: RegNotesComponent },
      ]},
    ]},
    /*
    {path: '', canActivate:[JbzAuthGuard], children: [
      
    
    {path: 'user', children: [
        { path: '', component: MadTableFromRouterComponent, data: { desc: mtdesc.UserDesc, conf: <MadMasterConfig>{
              url: '/slimapi/user',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'search', url: '.', urlid: 'id_user' },
                { name: 'email', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'role', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'locations_xref', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'active'  },
              ],
              trClassDyn: (data) => { return {
                'table-secondary' : !data.active,
              }},
              buttons_top: [
                  { title: 'zalozit noveho uzivatele', icon: "plus", url: 'new' }
              ],
            },
        }},
        { path: 'new', component: MadDetailFromRouterComponent, data: { desc: mtdesc.UserDesc, conf: <MadMasterConfig>{
              url: '/slimapi/user',
              columns: [ "email", "passwd", "role", "locations_xref", "active" ],
              formtype: "forcenew",
              onSuccessUrl: "..",
              onCancelUrl: "..",
            },
            data: { active: true },
        }},
        { path: ':id', component: MadDetailFromRouterComponent, data: { desc: mtdesc.UserDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/user/{id}',
              columns: [ "email", "passwd", "role", "locations_xref", "active" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "..",
              onCancelUrl: "..",
            },
        }},
      ]},
      */

    
    {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(ROUTES, {
    relativeLinkResolution: 'legacy',
    //paramsInheritanceStrategy: 'always', // aby byly k dispozici i parent parametry - dle doc i data; zkusime zatim bez toho
});