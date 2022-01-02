import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { ReqNotesComponent } from './notes/req-notes/req-notes.component';
import { UserGuard } from './shared/user.guard';
import { AdminGuard } from './shared/admin.guard';
import { MadDetailFromRouterComponent, MadTableFromRouterComponent } from './madtable/madtable.module';
import { MadMasterConfig } from './madtable/mad.types';
import { NotesReqDesc, UserDesc } from './workplace/mtconfig';
import { WorkplaceComponent } from './workplace/workplace.component';
import { NotesWorkplaceComponent } from './workplace/notes-workplace/notes-workplace.component';
import { TodoComponent } from './todo/todo.component';
import { DtNewComponent } from './notes/dt-new/dt-new.component';



const ROUTES: Routes = [
    //{path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '',      component: AppComponent},
    {path: 'login', component: LoginComponent},

    
    {path: 'workplace', canActivate:[UserGuard], component: WorkplaceComponent, children: [
      {path: 'user', canActivate:[AdminGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                url: '/slimapi/users',
                columns: [
                  { name: 'detail', title: 'detail', type: 'link', icon: 'search', url: '.', urlid: 'id_user' },
                  { name: 'email', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'role', filtering: {filterString: '', placeholder: 'Filter'} },
                  //{ name: 'locations_xref', filtering: {filterString: '', placeholder: 'Filter'} },
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
          { path: 'profile', component: TodoComponent },
          { path: 'new', component: MadDetailFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                url: '/slimapi/users',
                columns: [ "email", "passwd", "role", "active" ],
                formtype: "forcenew",
                onSuccessUrl: "..",
                onCancelUrl: "..",
              },
              data: { active: true },
          }},
          { path: ':id', component: MadDetailFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                baseurl: '/slimapi/users/{id}',
                columns: [ "email", "passwd", "role", "active" ],
                formtype: 'forceedit',//'editable',
                onSuccessUrl: "..",
                onCancelUrl: "..",
              },
          }},
        ]},


      {path: 'notes', canActivate:[UserGuard], component: NotesWorkplaceComponent, children: [
        {path: 'req', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
                url: '/slimapi/notes/req/list/notes',
                columns: [
                  { name: 'detail', title: 'detail', type: 'link', icon: 'edit', url: '.', urlid: 'id_notes_req' },
                  { name: 'milestone_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'req_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'state' },
                  { name: 'created' },
                  { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                  { name: 'replied' },
                  { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                  { name: 'creator_email', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'worker_email', filtering: {filterString: '', placeholder: 'Filter'}    },
                  //{ name: 'locations_xref', filtering: {filterString: '', placeholder: 'Filter'} },
                ],
                trClassDyn: (data) => { return {
                  'table-success' : data.state=='confirmed',
                  'table-danger' :   data.state=='rejected',
                }},
              },
          }},
          { path: ':id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/detail/{id}',
              columns: [ "state", "reply" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "..",
              onCancelUrl: "..",
            },
          }},
        ]},
        { path: 'dt-req', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              url: '/slimapi/notes/req/list/newdtreq',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'edit', url: '.', urlid: 'id_notes_req' },
                { name: 'milestone_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'req_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'state' },
                { name: 'created' },
                { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'replied' },
                { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'creator_email', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'worker_email', filtering: {filterString: '', placeholder: 'Filter'}    },
              ],
              trClassDyn: (data) => { return {
                'table-success' : data.state=='confirmed',
                'table-danger' :   data.state=='rejected',
              }},
            },
          }},
          { path: ':id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/detail/{id}',
              columns: [ "state", "reply" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "..",
              onCancelUrl: "..",
            },
          }},
        ]},
        { path: 'dt', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              url: '/slimapi/notes/dt/list',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'edit', url: '.', urlid: 'id_notes_dt' },
                { name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'dt_name', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'state' },
                { name: 'created' },
                { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'replied' },
                { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'creator_email', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'worker_email', filtering: {filterString: '', placeholder: 'Filter'}    },
              ],
              trClassDyn: (data) => { return {
                'table-success' : data.state=='confirmed',
                'table-danger' :   data.state=='rejected',
              }},
            },
          }},
          { path: ':id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/dt/detail/{id}',
              columns: [ "state", "reply" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "..",
              onCancelUrl: "..",
            },
          }},
        ]},
      ]},
    ]},

    {path: 'dtnew', canActivate:[UserGuard], component:DtNewComponent },
    
    {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(ROUTES, {
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled',
    //paramsInheritanceStrategy: 'always', // aby byly k dispozici i parent parametry - dle doc i data; zkusime zatim bez toho
});