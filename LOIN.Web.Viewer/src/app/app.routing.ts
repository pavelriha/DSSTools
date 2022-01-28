import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppComponent } from './app.component';
import { UserGuard } from './shared/user.guard';
import { AdminGuard } from './shared/admin.guard';
import { MadDetailFromRouterComponent, MadTableFromRouterComponent } from './madtable/madtable.module';
import { MadMasterConfig } from './madtable/mad.types';
import { NotesDtEditDesc, NotesReqDesc, RequirementsDesc, stateFilterDef, UserDesc } from './workplace/mtconfig';
import { WorkplaceComponent } from './workplace/workplace.component';
import { NotesWorkplaceComponent } from './workplace/notes-workplace/notes-workplace.component';
import { TodoComponent } from './todo/todo.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const ROUTES: Routes = [  
    //{path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '',      component: AppComponent},
    {path: 'login', component: LoginComponent},
    {path: 'access-denied', redirectTo: '/workplace/access-denied'}, 
    
    
    {path: 'workplace', canActivate:[UserGuard], component: WorkplaceComponent, children: [
      {path: 'access-denied', component: AccessDeniedComponent},
      {path: 'profile',  component: UserProfileComponent },
      {path: 'users', canActivate:[AdminGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                title: 'Správa uživatelů',
                url: '/slimapi/users',
                paging: [],
                showFilterRow: false,
                columns: [
                  //{ name: 'detail', title: 'detail', type: 'link', icon: 'info', url: '.', urlid: 'id_user' },
                  { name: 'edit',  type: 'link', icon: 'edit', url: '.', urlid: 'id_user' },
                  { name: 'name', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'email', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'role', filtering: {filterString: '', placeholder: 'Filter'} },
                  //{ name: 'locations_xref', filtering: {filterString: '', placeholder: 'Filter'} },
                  { name: 'active', filtering: { type: 'select', compmode: 'is',  options: [ { id: '', text: 'vše' },{ id: '1', text: 'aktivní' },{ id: '0', text: 'deaktivované' }, ] } },
                ],
                trClassDyn: (data) => { return {
                  'table-secondary' : !data.active,
                }},
                buttons_top: [
                    { title: 'zalozit noveho uzivatele', icon: "plus", url: 'new' }
                ],
              },
          }},
          { path: 'new', component: MadDetailFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                url: '/slimapi/users',
                columns: [ "name", "email", "passwd", "role", "active" ],
                formtype: "forcenew",
                onSuccessUrl: "..",
                onCancelUrl: "..",
              },
              data: { active: true },
          }},
          { path: ':id', component: MadDetailFromRouterComponent, data: { desc: UserDesc, conf: <MadMasterConfig>{
                baseurl: '/slimapi/users/{id}',
                columns: [ "name", "email", "passwd", "role", "active" ],
                formtype: 'forceedit',//'editable',
                onSuccessUrl: "..",
                onCancelUrl: "..",
              },
          }},
        ]},


      {path: 'notes', canActivate:[UserGuard], component: NotesWorkplaceComponent, children: [
        {path: '', redirectTo: 'req', pathMatch: 'full' },
        {path: 'req', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
                title: 'Poznámky k vlastnostem',
                url: '/slimapi/notes/req/list/notes',
/*                 filter: [
                  { name: 'stav', col_name: 'state', value: '', type: 'fa', options: [
                    { id: '', text: 'vše' },
                    { id: 'new', text: 'nové' },
                    { id: 'confirmed', text: 'schválené' },
                    { id: 'rejected', text: 'zamítnuté' },
                  ]},
                  { name: 'creator', col_name: 'id_user_creator', value: '', type: 'fa', optionsUrl: '/slimapi/options/users' },
                ], */
                columns: [
                  { name: 'detail', title: 'detail', type: 'link', icon: 'info', url: 'detail', urlid: 'id_notes_req' },
                  { name: 'edit',  type: 'link', icon: 'edit', url: 'edit', urlid: 'id_notes_req', if: 'canEdit' },
                  { name: 'check', type: 'link', icon: 'thumb-up', url: 'check', urlid: 'id_notes_req', if: 'canCheck' },
                  //{ name: 'milestone_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'milestone_name', filtering: { col_name: 'milestone_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/milestones/note'  }    },
                  //{ name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'dt_name',  filtering: { col_name: 'dt_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/dt/note'  }    },
                  //{ name: 'req_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'req_name', filtering: { col_name: 'req_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/req/note'  }    },
                  { name: 'created' },
                  { name: 'request_type' },
                  { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                  { name: 'reasons' },
                  { name: 'replied' },
                  { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                  { name: 'creator_name', filtering: {filterString: '', col_name: 'id_user_creator', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' } },
                  { name: 'worker_name', filtering: {filterString: '', col_name: 'id_user_worker', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' }  },
                  { name: 'repository', filtering: {filterString: '', placeholder: 'Filter'}    },
                  { name: 'state', filtering: stateFilterDef },
                  //{ name: 'locations_xref', filtering: {filterString: '', placeholder: 'Filter'} },
                ],
                trClassDyn: (data) => { return {
                  'confirmed' : data.state=='confirmed',
                  'rejected' :  data.state=='rejected',
                }},
              },
          }},
          { path: 'detail/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
            baseurl: '/slimapi/notes/req/detail/{id}',
            columns: [ "state", "milestone", "dt", "req", 
              "request_type", "suggestion", "reasons", "created", "creator", "replied", "worker", "reply", "repository" ],
            //formtype: 'editable',
            onSuccessUrl: "../..",
            onCancelUrl: "../..",
          },
          }},
          { path: 'edit/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/update/{id}',
              columns: [  "milestone", "dt", "req", 
                "request_type", "suggestion",  "reasons"  ],
              readonlyCollumns: [  "milestone", "dt", "req" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
          { path: 'check/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/check/{id}',
              columns: [ 
                "milestone", "dt", "req", "suggestion", "reasons",  
                 "state", "reply" ],
              readonlyCollumns: ["milestone", "dt", "req", "suggestion", "reasons"],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
        ]},
        { path: 'dt-req', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              title: 'Návrhy vlastností do šablon',
              url: '/slimapi/notes/req/list/newdtreq',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'info', url: 'detail', urlid: 'id_notes_req' },
                { name: 'edit',  type: 'link', icon: 'edit', url: 'edit', urlid: 'id_notes_req', if: 'canEdit' },
                { name: 'check', type: 'link', icon: 'thumb-up', url: 'check', urlid: 'id_notes_req', if: 'canCheck' },
                //{ name: 'milestone_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'milestone_name', filtering: { col_name: 'milestone_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/milestones/new'  }    },
                //{ name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'dt_name',  filtering: { col_name: 'dt_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/dt/new'  }   },
                //{ name: 'req_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'req_name', filtering: { col_name: 'req_uuid', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/req/new'  }    },
                { name: 'state', filtering: stateFilterDef },
                { name: 'created' },
                { name: 'request_type' },
                { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'reasons' },
                { name: 'replied' },
                { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'creator_name', filtering: {filterString: '', col_name: 'id_user_creator', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' } },
                { name: 'worker_name', filtering: {filterString: '', col_name: 'id_user_worker', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' }  },
                { name: 'repository', filtering: {filterString: '', placeholder: 'Filter'}    },
              ],
              trClassDyn: (data) => { return {
                'confirmed' : data.state=='confirmed',
                'rejected' :  data.state=='rejected',
              }},
            },
          }},
          { path: 'detail/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
            baseurl: '/slimapi/notes/req/detail/{id}',
            columns: [ "state", "milestone", "dt", "req",
              "request_type", "suggestion", "reasons",  "created", "creator", "replied", "worker", "reply", "repository" ],
            //formtype: 'editable',
            onSuccessUrl: "../..",
            onCancelUrl: "../..",
          },
          }},
          { path: 'edit/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/update/{id}',
              columns: [ "milestone", "dt", "req", 
                "request_type", "suggestion",  "reasons"  ],
              readonlyCollumns: [ "milestone", "dt", "req"],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
          { path: 'check/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/req/check/{id}',
              columns: [ 
                "milestone", "dt", "req", "suggestion", "reasons",
                "state", "reply" ],
              readonlyCollumns: [ "milestone", "dt", "req", "suggestion", "reasons" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
        ]},
        { path: 'dt', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              title: 'Nové datové šablony',
              url: '/slimapi/notes/dt/list',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'info', url: 'detail', urlid: 'id_notes_dt' },
                { name: 'edit',  type: 'link', icon: 'edit', url: 'edit', urlid: 'id_notes_dt', if: 'canEdit' },
                { name: 'check', type: 'link', icon: 'thumb-up', url: 'check', urlid: 'id_notes_dt', if: 'canCheck' },
                { name: 'push', type: 'request', icon: 'airplane', url: '/slimapi/notes/dt/push2ifc/{id_notes_dt}', if: 'canCheck' },
                //{ name: 'dispatch' },
                //{ name: 'dt_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'dt_name', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'state', filtering: stateFilterDef },
                { name: 'created' },
                { name: 'suggestion', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'replied' },
                { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'creator_name', filtering: {filterString: '', col_name: 'id_user_creator', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' } },
                { name: 'worker_name', filtering: {filterString: '', col_name: 'id_user_worker', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' }  },
                { name: 'repository', filtering: {filterString: '', placeholder: 'Filter'}    },
              ],
              trClassDyn: (data) => { return {
                'confirmed' : data.state=='confirmed',
                'rejected' :  data.state=='rejected',
              }},
            },
          }},
          { path: 'detail/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
            baseurl: '/slimapi/notes/dt/detail/{id}',
            columns: [ "state", "dt", "suggestion",  "created", "creator", "replied", "worker", "reply", "repository" ],
            //formtype: 'editable',
            onSuccessUrl: "../..",
            onCancelUrl: "../..",
          },
          }},
          { path: 'edit/:id', component: MadDetailFromRouterComponent, data: { desc: NotesDtEditDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/dt/update/{id}',
              columns: [ "dt_name", "suggestion" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
          { path: 'check/:id', component: MadDetailFromRouterComponent, data: { desc: NotesReqDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/notes/dt/check/{id}',
              columns: [ "dt", "suggestion",
                "state", "reply" ],
              readonlyCollumns: [ "dt", "suggestion" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
        ]},
        
        { path: 'requirement', canActivate:[UserGuard], children: [
          { path: '', component: MadTableFromRouterComponent, data: { desc: RequirementsDesc, conf: <MadMasterConfig>{
              title: 'Nové vlastnosti',
              url: '/slimapi/requirements',
              columns: [
                { name: 'detail', title: 'detail', type: 'link', icon: 'info', url: 'detail', urlid: 'id_requirement' },
                { name: 'edit', title: 'edit', type: 'link', icon: 'edit', url: 'edit', urlid: 'id_requirement', if: 'canEdit' },
                { name: 'check', title: 'check', type: 'link', icon: 'thumb-up', url: 'check', urlid: 'id_requirement', if: 'canCheck' },
                { name: 'push', type: 'request', icon: 'airplane', url: '/slimapi/requirements/push2ifc/{id_requirement}', if: 'canCheck' },
                //{ name: 'dispatch' },
                //{ name: 'req_uuid', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'name', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'datatype_cs'},
                { name: 'units', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'description', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'note', filtering: {filterString: '', placeholder: 'Filter'}    },
                { name: 'state', filtering: stateFilterDef },
                { name: 'created' },
                { name: 'replied' },
                { name: 'reply', filtering: {filterString: '', placeholder: 'Filter'} },
                { name: 'creator_name', filtering: {filterString: '', col_name: 'id_user_creator', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' } },
                { name: 'worker_name', filtering: {filterString: '', col_name: 'id_user_worker', type: 'select', compmode: 'is', optionsUrl: '/slimapi/options/users' }  },
                { name: 'repository', filtering: {filterString: '', placeholder: 'Filter'}    },
              ],
              trClassDyn: (data) => { return {
                'confirmed' : data.state=='confirmed',
                'rejected' :  data.state=='rejected',
              }},
            },
          }},
          { path: 'detail/:id', component: MadDetailFromRouterComponent, data: { desc: RequirementsDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/requirements/detail/{id}',
              columns: [ "state", "nameuuid", "datatype", "units", "description", "note", "created", "creator", "replied", "worker", "reply", "repository" ],
              //formtype: 'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
          { path: 'edit/:id', component: MadDetailFromRouterComponent, data: { desc: RequirementsDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/requirements/update/{id}',
              columns: [ "name", "id_datatype", "units", "description", "note" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
          { path: 'check/:id', component: MadDetailFromRouterComponent, data: { desc: RequirementsDesc, conf: <MadMasterConfig>{
              baseurl: '/slimapi/requirements/check/{id}',
              columns: [ "name", "units", "description", "note",
                "state", "reply" ],
              readonlyCollumns: [ "name", "units", "description", "note" ],
              formtype: 'forceedit',//'editable',
              onSuccessUrl: "../..",
              onCancelUrl: "../..",
            },
          }},
        ]},
      ]},
    ]},

    //{path: 'dtnew', canActivate:[UserGuard], component:DtNewComponent },
    //{path: 'reqnew', canActivate:[UserGuard], component:NewReqComponent },
    
    {path: '**', component: PageNotFoundComponent}
];

export const routing = RouterModule.forRoot(ROUTES, {
    relativeLinkResolution: 'legacy',
    scrollPositionRestoration: 'enabled',
    //paramsInheritanceStrategy: 'always', // aby byly k dispozici i parent parametry - dle doc i data; zkusime zatim bez toho
});
