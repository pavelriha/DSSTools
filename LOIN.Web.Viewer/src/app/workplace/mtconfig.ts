export const UserDesc = {
    resource_name: 'data',
    resource_name_plural: 'data',
    properties: { 
      email: { label: 'Email', type: "email"},
      passwd: { label: 'Heslo', type: "password"},
      active: { label: 'aktivní', type: "bool" },
      role: { label: 'Oprávnění', type: 'simpleselect', options: [ 
         { id: 'user', name:'user'},
         { id: 'worker', name:'worker'},
         { id: 'admin', name:'Admin'},
         { id: 'master', name:'Master of the DSS'},
      ]},
      //locations_xref: { label: 'Hospody', type: 'multiselect', optionsUrl: '/slimapi/locations?per_page=999&filter[active.is]=1' },
    }
   };

export const NotesReqDesc = {
  resource_name: 'data',
  resource_name_plural: 'data',
  properties: { 
    reply: { label: 'Odpověď' },
    state: { label: 'stav', type: 'simpleselect', options: [ 
       { id: 'new', name:'nová připomínka'},
       { id: 'confirmed', name:'schváleno'},
       { id: 'rejected', name:'zamítnuto'},
    ]},
    //locations_xref: { label: 'Hospody', type: 'multiselect', optionsUrl: '/slimapi/locations?per_page=999&filter[active.is]=1' },
  } 
}