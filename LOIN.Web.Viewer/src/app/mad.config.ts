import { CellDefaultComponent } from "./cells/cell-default.component";
import { cell_type_map } from "./cells/cells.module";
import { MadMasterConfig } from './madtable/mad.types';

export const madMasterConfig: MadMasterConfig = {
    includeBootstrap: true,
    paging: [ 10, 20, 50, 100],
    per_page: 50,
    cell_type_default_component: CellDefaultComponent,
    cell_type_map: cell_type_map,
    mtWrapperClass: '', //'table-responsive',
    showFilterRow: true,
    mdWrapperClass: 'd-flex', //'table-responsive',
    mdTableClass: 'table table-sm mb-0',
    mdLabelSubmit: 'Odeslat',
    mdLabelCancel: 'Zrušit',
    //getDetail: jbz.test,
    //getData: loadContext,
    //getDetail: loadContext(),
  };