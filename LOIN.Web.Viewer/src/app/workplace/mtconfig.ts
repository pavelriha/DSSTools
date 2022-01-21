export const UserDesc = {
    properties: { 
      email: { label: 'Email', type: "email"},
      passwd: { label: 'Heslo', type: "password"},
      active: { label: 'aktivní', type: "bool" },
      role: { label: 'Oprávnění', type: 'simpleselect', options: [ 
         { id: 'user', name:'user - externí expert'},
         { id: 'worker', name:'worker - interni zpracovatel'},
         { id: 'admin', name:'admin - správce uživatelů'},
         { id: 'master', name:'Master of the DSS'},
      ]},
      //locations_xref: { label: 'Hospody', type: 'multiselect', optionsUrl: '/slimapi/locations?per_page=999&filter[active.is]=1' },
    }
   };

export const stateFilterDef = { type: 'select', compmode: 'is',  options: [
    { id: '', text: 'vše' },
    { id: 'new', text: 'nové' },
    { id: 'confirmed', text: 'schválené' },
    { id: 'rejected', text: 'zamítnuté' },
  ]};

export const stateDef =  { label: 'Stav', type: 'simpleselect', options: [ 
  { id: 'new', name:'nová připomínka'},
  { id: 'confirmed', name:'schváleno'},
  { id: 'rejected', name:'zamítnuto'},
]};

export const requestTypeDef = { label: 'Typ žádosti', type: 'simpleselect', options: [ 
  { id: 'info', name: 'informace'},
  { id: 'add', name: 'přidat do užití'},
  { id: 'del', name: 'odebrat z užití'},
]};


export const NotesReqDesc = {
  properties: { 
    milestone: { label: 'Milník', type: 'nameuuid', name: 'milestone_name', uuid: 'milestone_uuid' },
    milestone_name: { label: 'Milník' },
    dt: { label: 'Šablona', type: 'nameuuid', name: 'dt_name', uuid: 'dt_uuid' },
    dt_name: { label: 'Šablona' },
    req: { label: 'Vlastnost', type: 'nameuuid', name: 'req_name', uuid: 'req_uuid' },
    req_name:  { label: 'Vlastnost' },
    reply: { label: 'Odpověď', type: 'textarea', required: true },
    created: { label: 'Vytvořeno', type: 'datetime' },
    suggestion: { label: 'Návrh', type: 'textarea' },
    replied: { label: 'Vyřízeno', type: 'datetime' },
    state: stateDef,
    reasons: { label: 'Způsoby užití', type: 'reasons' },
    request_type: requestTypeDef,
    repository: { label: 'Pořízeno ve verzi' },
    creator_name: { label: 'Vložil' },
    creator: { label: 'Vložil', type: 'nameuuid', name: 'creator_name', uuid: 'creator_email' },
    worker_name: { label: 'Zpracoval' },
    worker: { label: 'Zpracoval', type: 'nameuuid', name: 'worker_name', uuid: 'worker_email' },
    dispatch: { type: 'bool'},
  } 
}
/* export const NotesReqEditDesc = {
  properties: { 
  } 
} */


export const NotesDtEditDesc = {
  properties: { 
  } 
}

export const RequirementsDesc = {
  properties: { 
    name: { label: 'Název vlastnosti', read_only: true },
    nameuuid: { label: 'Název vlastnosti', type: 'nameuuid', name: 'name', uuid: '' },
    datatype_cs: { label: 'Datový typ' },
    datatype: { label: 'Datový typ', type: 'nameuuid', name: 'datatype_cs', uuid: 'datatype_ifc' },
    id_datatype: { label: 'Datový typ', type: 'datatype' },
    units: { label: 'Měrná jednotka'},
    description: { label: 'Popis'},
    note: { label: 'Poznámka'},
    created: { label: 'Vytvořeno', type: 'datetime' },
    replied: { label: 'Vyřízeno', type: 'datetime' },
    repository: { label: 'Pořízeno ve verzi' },
    reply: { label: 'Odpověď', type: 'textarea', required: true },
    state: stateDef,
    creator_name: { label: 'Vložil' },
    creator: { label: 'Vložil', type: 'nameuuid', name: 'creator_name', uuid: 'creator_email' },
    worker_name: { label: 'Zpracoval' },
    worker: { label: 'Zpracoval', type: 'nameuuid', name: 'worker_name', uuid: 'worker_email' },
    dispatch: { type: 'bool'},
  } 
}




