import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild } from '@angular/core';
//import { ActivatedRoute, Router  } from '@angular/router';
import { ControlContainer, NgForm } from '@angular/forms';
import { MADTABLEINIT_CONFIG } from '../madtable-init.config';
import { MadTableCellRawValue } from '../mad-table-cell/raw.component';
import { MadMasterConfig } from '../mad.types';
import { MadService } from '../mad.service';

@Component({
  selector: 'mad-detail',
  templateUrl: './mad-detail.component.html',
  styleUrls: ['./mad-detail.component.scss']
})
export class MadDetailComponent implements OnInit {
  @Input('data') data_input: any;
  @Input('columns') columns: any[]; //umime [{name:'name'},{name: 'zip_code'}] nebo ['name','contact_email','contact_mobile']
  @Input('desc') dataDescription: any;
  @Input('resturl') restUrl: any;
  //@Input('editable') editable: boolean;
  //@Input('forceedit') forceedit: boolean;
  @Input('formtype') formtype: string; // editab;e|forceedit|forcenew
  //@Input('forcenew') forcenew: boolean;
  @Output() onSave = new EventEmitter();
  
  @Input('config') UserConfig: MadMasterConfig; // budem pouzivat? treba casem jo, pouzijem z madtable
  
  @ViewChild('editform') editform: NgForm;
  
  defaultConfig:MadMasterConfig = {
      cell_type_default_component: MadTableCellRawValue,
  }
  TableConfig: MadMasterConfig = {};

  public edit: boolean = false;
  public data: any;
  private data_orig: any;
  loading: boolean = true;
  public errorMsg: string = '';


  constructor(
    @Inject(MADTABLEINIT_CONFIG) private madtableinitConfig: MadMasterConfig,
    private madservice: MadService,
	//public router: Router,
	//public route: ActivatedRoute 
  ) { 
  }

  ngOnInit() {
    //this.madservice.getDataDescription(this.url).subscribe( 
	//  dd => this.init2(dd),
	//  r => this.madservice.popupHttpError(r));
      
//      console.info('D init');
//      console.info(this.TableConfig.getDetail);
//      this.TableConfig.getDetail('D init fce');
  }
  
  ngOnChanges() {
    // sluc default a init configy a prebij to aktualnim user configem
    this.TableConfig = {};
    //console.info(this.TableConfig, this.defaultConfig, this.madtableinitConfig, this.UserConfig);
    Object.assign(this.TableConfig, this.defaultConfig, this.madtableinitConfig, this.UserConfig);
    
    if (!this.data_input) {
        //console.log("MD missing data, doing request. URL=", this.getUrl() );
        this.loading = true;
        this.madservice.getDataRaw(this.getUrl()).subscribe(
          d => { this.loading = false; this.data_orig = d.data; this.init2(); },
          r => { this.loading = false; this.madservice.popupHttpError(r) },
        );
    } else {
        //console.log("MD data inline");
        this.data_orig = this.data_input;
        this.init2();
    }
  }
  
  init2() {
    //aby se nam prubezny edit nepropisoval do puvodnich dat
    this.recoverData();

    //console.log(this.columns);
    if (!this.columns || this.columns.length == 0 && this.TableConfig.columns) this.columns = this.TableConfig.columns;
    if (!this.columns || this.columns.length == 0) {
      this.columns = [];
      let cols;
      if (this.data && this.data.length > 0) cols = this.data;
      else cols = this.dataDescription.properties;
      for (var col in cols) {
        if (!this.dataDescription.properties[col].read_only)
          this.columns.push({ name: col });
      }
    } else if (! (this.columns[0] instanceof Object) ) {
      let pom = [];
      for (var i=0; i<this.columns.length; i++) {
        pom.push({ name: this.columns[i] });
      }
      this.columns = pom;
    }
    this.columns.forEach((col:any) => {
      if (!col.title && this.dataDescription.properties[col.name]) 
        col.title = this.dataDescription.properties[col.name].label;
    });
    //console.log(this.columns);
    if (this.formtype) {
      if (!this.restUrl && !this.TableConfig.url) console.error('restUrl missing');
      if (!this.dataDescription.resource_name) console.error('resource_name missing');
    }
    if (this.formtype=='forceedit' || this.formtype=='forcenew') {
      this.editStart();
    }
    
  }
  
  getUrl() {
      if (typeof this.TableConfig.url === 'function') {
          return this.TableConfig.url();
      } else {
          return this.TableConfig.url;
      }
  }

//  getValue(dd:Array<any>, name:string) {
//    name.split('.').forEach(s => { dd = dd[s] });
//    return dd;
//  }

  recoverData() {
	this.data = JSON.parse(JSON.stringify(this.data_orig));
  }

  editStart() {
	this.edit = true;
  }
  editCancel() {
	this.recoverData();
    this.edit = false;
    this.onSave.emit(false);
  }

  onSubmit() {
    this.errorMsg = '';
    if (this.editform.invalid) {
        // direktiva co nam nastavuje BS error classy, tak pracuje s !touched a neumim to tam dat jeste dle submited, takze zatim jedine reseni je udelat vsem touch 
        this.editform.form.markAllAsTouched();
        return false;
    }
    
    /* tohle nefunguje a nevim kurva proc 
	 * (nejak se to zavola v jinem "kontextu" a nefunguje this uvnitr te metody, ale jak to udelat spravne teda??
     * ANSWER: 
     * asi by to melo jit pres url.call(this, ...) ale to taky nefungovalo
     * funguje ale kdyztak neco jako this.madservice[url]()

    let url: Function;
    if (this.formtype=='forcenew') url = this.madservice.sendDataPost;
	else url = this.madservice.sendData;
	console.log(url);
    url(this.restUrl, this.data).subscribe(
	*/

    this.madservice.submit(this.formtype=='forcenew', this.restUrl?this.restUrl:this.TableConfig.url, this.editform.value).subscribe(
	  r => { 
		//this.data = r[this.dataDescription.resource_name];
		// PHP version
		//this.data = r[this.dataDescription.resource_name][0];
		this.data = r[this.dataDescription.resource_name];
	    this.edit=false;
        this.onSave.emit(this.data);
	  },
	  r => { 
	    //this.madservice.popupHttpError(r);
        this.errorMsg = r.error.message;
		this.edit = true;
		}
	);
  }
    
}
