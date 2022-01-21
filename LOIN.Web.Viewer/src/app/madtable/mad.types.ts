import { Type } from '@angular/core';

export class MadMeta {
  total_results: number;
  per_page: number;
  total_pages: number;
  page: number;
}


export class MadMasterConfig {
  baseurl?: string; // zaklad adresy v ktere se nahradi {id} za ID z nadrazeneho routeru
  url?: string|(()=>string); // url string nebo "geturl" funkce
    
  cell_type_default_component?: Type<any>;
  cell_type_map?: object;
  
  //getDetail?: ((url)=>any); // fce co vrati data pozadovaneho ID (url)
  //getData?: (()=>any); //test
  
  columns?:Array<any>;
  
  // madTable
  title?: string;
  mtWrapperClass?: string; // napr table-responsive
  insert?: any;
  count_total?: boolean;
  filter?:Array<any>; // global table filter
  showFilterRow?:boolean; // show table filter row by default
  trClassDyn?;
  buttons_top?:Array<any>;//vlastni tlacitka nad tabulkou. {title, icon, text, url, click}
  paging?:Array<number>;
  per_page?:number;

  // madDetail
  mdWrapperClass?:string;
  mdTableClass?:string;
  mdLabelSubmit?:string;
  mdLabelCancel?:string;
  readonlyCollumns?:Array<string>; // silnejsi variante read_only flagu v description, vubec to bunku neprepne na edit
  //nepodarilo se realizovat mdSubmitButtons?:Array<any>; 
  // madDetailPage (MadDetailFromRouterComponent)
  onSuccessUrl?:string;
  onCancelUrl?:string;
}
