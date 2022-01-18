import { Component, OnInit, Input, Inject } from '@angular/core';

import { MadMasterConfig } from '../mad.types';
import { MadService } from '../mad.service';
//import { MadTableInitConfig, MADTABLEINIT_CONFIG } from '../madtable-init.config';
import { MADTABLEINIT_CONFIG } from '../madtable-init.config';
import { MadTableCellRawValue } from '../mad-table-cell/raw.component';

//import { Observable } from 'rxjs/Observable';
//import { Subject }    from 'rxjs/Subject';
//import { of }         from 'rxjs/observable/of';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'mad-table',
  templateUrl: './mad-table.component.html',
  styleUrls: ['./mad-table.component.scss']
})
export class MadTableComponent implements OnInit {
  @Input('config') UserConfig: MadMasterConfig;
  @Input('desc') dataDescription: any;
  loading: boolean = true;
  data: any;
  dataSum: any = {};
  columns:Array<any>;
  config:any = {
    paging: true,
    //sorting: {columns: this.columns},
    filtering: {filterString: ''}, // ?? je to k necemu??
    className: ['table-bordered']
  };
  defaultConfig:MadMasterConfig = {
      paging: [ 5, 15, 50 ],
      //per_page  nenastavujem, default je paging[0]
      cell_type_default_component: MadTableCellRawValue,
  }
  TableConfig: MadMasterConfig = {};
  
  public filtering: boolean;
  public showFilterRow: boolean;
  public detail: any;
  public detailParam: any;
  public detailType: string;
  public detailTitle: string;
  public detailRestUrl: string;

  //dataDescription: any;
  json_field: string;

  public filter = new Subject<boolean>();// pouzijem subject kvuli zpomaleni dotazu (debounce)

  onChangeTable() : void {
    //console.log(this.config);
	//this.getData(this.data.meta.per_page, this.data.meta.page);
	this.getData(this.data.meta.per_page, 1);// zmenili se parametry, resetujem stranku na 1.
  }

  constructor(
    @Inject(MADTABLEINIT_CONFIG) private madtableinitConfig: MadMasterConfig,
    private madservice: MadService,
  ) { 
  }


  ngOnChanges() {
console.info('[MadTable] OnChange start', Date.now());
    // sluc default a init configy a prebij to aktualnim user configem
    this.TableConfig = {};
    //console.info(this.TableConfig, this.defaultConfig, this.madtableinitConfig, this.UserConfig);
    Object.assign(this.TableConfig, this.defaultConfig, this.madtableinitConfig, this.UserConfig);
    // vola se pri zmene vstupu
	// vola se i pri prvnim spusteni, takze nemusime pouzivat ngOnInit, delali bychom to 2x (vola se dokonce PRED ngOnInit!)
	this.init1();
  }
  ngOnInit() {
    this.filter.pipe(
	  debounceTime(200),
	  switchMap( (term: boolean) => this.filter_search() ),
	).subscribe();
  }
  
  getUrl() {
      if (typeof this.TableConfig.url === 'function') {
          return this.TableConfig.url();
      } else {
          return this.TableConfig.url;
      }
  }

  init1() {
    if (this.TableConfig.insert && !this.TableConfig.insert.title) this.TableConfig.insert.title = 'Insert new record';
    if (!this.dataDescription) {
        if (this.getUrl())
            this.madservice.getDataDescription(this.getUrl()).subscribe( 
              dd => this.init2(dd),
              r => { this.loading = false; this.madservice.popupHttpError(r)},
            );
	} else {
	    this.init2(this.dataDescription);
	}
  }
  init2(dataDescription) {
    this.dataDescription = dataDescription;

	//this.TableConfig.title = this.dataDescription.name;

	this.columns = this.TableConfig.columns;
	if (!this.columns || this.columns.length == 0) {
	  console.log('empty columns def, using all from meta');
	  this.columns = [];
	  for (var col in this.dataDescription.properties) {
		this.columns.push({ name: col })
	  }
	}
	this.filtering = false;
	this.showFilterRow = false;
	this.columns.forEach((col:any) => {
	  if (!col.title) col.title = this.dataDescription.properties[col.name]?.label;
      if (!col.title) col.title = col.name;
      if (col.filtering) {
        this.filtering = true;
        //col.filtering.filterString = '';
        if (col.filtering.filterString) this.showFilterRow = true;
        if (col.filtering.optionsUrl) {
          this.madservice.getDataRaw(col.filtering.optionsUrl).subscribe( d => col.filtering.options=[ {id:'',text:''}, ...d] );
        }
      }
	});

    this.config.sorting = {columns: this.columns};
	
	this.json_field = this.dataDescription.resource_name_plural ?? 'data';


  if (this.TableConfig.filter) this.TableConfig.filter.forEach( (f) => {
    if (f.optionsUrl) {
      this.madservice.getDataRaw(f.optionsUrl).subscribe( d => f.options=[ {id:'',text:''}, ...d] );
    }
  });



/*
	for (var col in this.dataDescription.properties) {
	  var prop = this.dataDescription.properties[col];
	  if (prop.choices && prop.choices.length>0) {
	    prop.choices_map = {};
		prop.choices.forEach((o:any) => {
		  prop.choices_map[o.value] = o.display_name;
		});
	  }
	}
*/

    this.getData(this.TableConfig.per_page ? this.TableConfig.per_page : this.TableConfig.paging[0], 1);
  }

  timestart: number;
  getData(per_page, page): void {
    this.timestart = Date.now();
    console.info('[MadTable] getData start', this.timestart, per_page, page);
    //console.log(this.config);
	this.loading = true;

	// zjisti zda se podle nejakeho sloupce ma radit
    let columnName:string = void 0;
    let sort:string = void 0;
    if (this.config.sorting) {
      let columns = this.config.sorting.columns || [];

      for (let i = 0; i < columns.length; i++) {
        if (columns[i].sort && columns[i].sort !== '' && columns[i].sort !== false) {
		  //console.log('sortcyklus found '+columns[i].name+' ('+columns[i].sort+')');
          columnName = columns[i].name;
          sort = columns[i].sort;
        }
      }

	  // sort order (asc vs desc)
      if (columnName && sort ==='desc' ) {
	    columnName = '-'+columnName;
      }

    }

	// Filters
    let filter:Array<any> = [];
	// Global filter
    if (this.TableConfig.filter)
      this.TableConfig.filter.forEach( (gf:any) => {
        if (gf.value) {
          filter.push({ colname: gf.col_name?gf.col_name:gf.name, filterstring: gf.value, type: gf.type?gf.type:'qs', compmode: gf.compmode?gf.compmode:'is' }); 
        }
      });
	// column filter
    this.columns.forEach((column:any) => {
      if (column.filtering && column.filtering.filterString) {
        filter.push({ 
          compmode:     column.filtering.compmode?column.filtering.compmode:'icontains',
          colname:      column.filtering.col_name?column.filtering.col_name:column.name, 
          filterstring: column.filtering.filterString 
        })
      }
    });


    this.madservice.getData(this.getUrl(), per_page, page, columnName, filter).subscribe(
	  d => { this.loading = false; this.getData2(d); },
	  r => { this.loading = false; this.madservice.popupHttpError(r) },
	);
  }
  
    getData2(data) {
        this.data = data;
        if (this.TableConfig.count_total) {
            //console.log('data2 count total TRUE');
            this.dataSum = {};
            let tcc = this.TableConfig.columns;
            for (let i = 0; i < tcc.length; i++) if (tcc[i].sum) this.dataSum[tcc[i].name]=0;
            for (let n = 0; n < this.data.data.length; n++) {
                let d = this.data.data[n]
                //console.log(n, d);

                for (let i = 0; i < tcc.length; i++) {
                    let conf = tcc[i];
                    if (conf.sum) {
                        //console.log(conf.name,  d[conf.name], conf);
                        this.dataSum[conf.name] += +d[conf.name];
                    }
                }
            }
        }
        //console.log(this.dataSum);
        let timeend = Date.now();
        console.info('getData2 end', timeend);
        console.info('getData2 time ', timeend-this.timestart);
    }

  setPerPage(pp) {
	this.data.meta.per_page = pp;
	this.data.meta.page = 1;
	this.getData(this.data.meta.per_page, this.data.meta.page);
  }

  public reload() {
	this.getData(this.data.meta.per_page, this.data.meta.page);
  }
  // pro predani reload() do child component musime udelat arrow fci, jinak to nebude volano ve spravnem kontextu
  reloadCallback = (): void => { this.reload(); }
  
  loadingCallback = (l: boolean): void => { this.loading = l; }

  sortToggle(column) {
    if (!this.config.sorting) return false;
	if (column.type) return false; //action sloupce

	this.config.sorting.columns.forEach((col:any) => {
	  if (col.name !== column.name && col.sort !== false) {
	    col.sort = '';
	  }
	});


    if (column.sort !== false) {
	  switch (column.sort) {
	    case 'asc':
            column.sort = 'desc';
            break;
/* PR vracet se na neutral nema smysl ne? bud nahoru nebo dolu, nic vic
        case 'desc':
            column.sort = '';
            break; 
*/
        default:
            column.sort = 'asc';
            break;

	  }
	  this.onChangeTable();
	}
  }

  filter_search():Observable<boolean> {
    //nevim jak jinak udelat ten debounce, takze tu musime mit fiktivni Observable, ktere samotne nepotrebujem
    this.onChangeTable();
	return of(true);
  }

  getValue(dd:Array<any>, name:string) {
    name.split('.').forEach(s => { dd = dd[s] });
    return dd;
  }

  restDelete(id, url) {
    if (!url) url = this.getUrl();
	this.loading = true;
    this.madservice.sendDelete(url + id+'/').subscribe(
	  d => { this.loading = false; this.reload()},
	  r => { this.loading = false; this.madservice.popupHttpError(r)},
	);
  }

  openDetail(param,rowdata) {
    this.detail = rowdata;
	this.detailParam = param;
	this.detailType = 'editable';
	this.detailRestUrl = param.url?param.url:this.getUrl()+this.detail.id+'/';
  }
  openDetailEdit(param,rowdata) {
    this.detail = rowdata;
	this.detailParam = param;
	this.detailType = 'forceedit';
	this.detailRestUrl = param.url?param.url:this.getUrl()+this.detail.id+'/';
  }
  openDetailNew(param,rowdata) {
    //parametr rowdata to nechame at je mozne treba preddefinovat nejake hodnoty
    this.detail = rowdata;
	this.detailParam = param;
	this.detailType = 'forcenew';
	this.detailRestUrl = param.url?param.url:this.getUrl();
    this.detailTitle = this.TableConfig.insert.title;
  }
  closeDetail() {
    this.reload();
    this.detail = false;
  }

}
