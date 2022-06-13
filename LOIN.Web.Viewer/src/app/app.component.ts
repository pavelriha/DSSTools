import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';

import { 
  ActorsService, BreakdownService, MilestonesService, ReasonsService, RepositoriesService, RequirementsService, RequirementSetsService,
} from './swagger/api/api';

import { GroupingType, Requirement, RequirementSet, GrouppedRequirements, GrouppedRequirementSets } from './swagger/model/models';
import { TreeModel, TreeNode, TreeComponent, ITreeOptions, ITreeState } from '@circlon/angular-tree-component';
import { FilterBoxComponent } from "./filter-box/filter-box.component";
import { ExportExcelService } from "./shared/services/export-excel.service";
import { AuthService } from './shared/services/auth.service';
import { SlimapiService } from './shared/services/slimapi.service';
import { ControlService } from './shared/services/control.service';
import { ModalService } from './_modal';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'; 
import { filter } from 'rxjs/operators';
import { Bookmark, BookmarkService } from './shared/services/bookmark.service';
//import { GoogleAnalyticsService } from 'ngx-google-analytics';

const DT_ID_OFFSET = 9000000; // id_offset pro nami dynamicky pridane polozky breakdown, aby nekolidovali a abychom poznali ktre to jsou

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('breaks') fbBreaks: FilterBoxComponent;
  @ViewChild('milestones') fbMilestones: FilterBoxComponent;
  @ViewChild('reasons') fbReasons: FilterBoxComponent;
  @ViewChild('actors') fbActors: FilterBoxComponent;
  @ViewChild('exportifcform') exportifcform: any;

  //@ViewChild('export_link') export_link: any;
  //@ViewChild('repo') fbRepo: FilterBoxComponent;
  //@ViewChild('repo') repo: nativeElement;
  public errors:string[] = [];
  //public repo: string;
  //public repoValue: string;
  //public help_url: string = 'https://www.koncepcebim.cz/dokumenty?dok=1063-napoveda-dss-online';
  public help_url: string = 'https://www.koncepcebim.cz/uploads/inq/files/DSS_online_pruvodce_Agentura%20CAS%20%281%29.pdf';
  public sel: string[];
/*   options = {
    useCheckbox: true
  }; */
  public ifc: boolean = false;
  public context: boolean = false;

  public filtersready: boolean = false;

  public repolist: string[];
  private saved_filters: any = {};

  public selectedTree: any[] = null;
  public selectedFlatTree: any[] = null;
  public selectedMilestones: any[] = null; // musime mit ulozeno pro pripominkovani
  public dataLoading: boolean = false;
  public dataTemplates: any[] = [];
  public reqtab: string = 'sets_cz';
  public notesReqData: any[] = [];
  public allRequiremets: any = {};

  // logged user info
  private usersub: any;
  public userdata: any = false;
  // control service
  private control: any;
  // URL param
  private paramSub: any;

  constructor(
    private actorsService: ActorsService,
    private breakdownService: BreakdownService,
    private milestonesService: MilestonesService,
    private reasonsService: ReasonsService,
    private repositoriesService: RepositoriesService,
    private requirementsService: RequirementsService,
    private requirementsSetsService: RequirementSetsService,
    private exportexcel: ExportExcelService,
    private authService: AuthService,
    private slimapi: SlimapiService,
    public controlService: ControlService,
    public modal: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    public location: Location,
    public bookmarkService: BookmarkService,
    //protected $gaService: GoogleAnalyticsService,
  ) { }

  ngOnInit(): void {
    //this.repolist = [ { key:'latest', value: 'aktuální' } ]; //toto musi byt prvni!
    this.repositoriesService.apiRepositoriesGet().subscribe(
      d => {  
        ////this.repolist.push(...d.sort().reverse());
        //d.sort().reverse().forEach( r => { this.repolist.push({ key: r, value: r }); });
        this.repolist = d;
        if (!this.controlService.selectedRepository) { // mohl to nastavit route.params.subscribe nize
          //this.controlService.selectedRepository  = this.saved_filters.repo??this.repolist[0];
          this.controlService.selectedRepository  = this.repolist[0];
          this.fetchFilters();
        }
      },
      e => { this.apiError(e); }
    );

    this.usersub = this.authService.userLogged.subscribe(ud => { 
      this.userdata = ud;
      console.log("user change", ud);
      if (ud) {
        if (this.controlService.selectedRepository) this.fetchFilters(); // kvuli novym sablonam
      } else {
        this.selectedTree = null;
      }
    });

    this.control = this.controlService.control.subscribe(cmd => { 
      console.log("[app.component]", cmd);
      if (cmd=='note-submited') this.runfilter();
      
    });

    this.paramSub = this.route.params.subscribe(params => {
      console.log('[init] params:', params, this.controlService.selectedRepository);
      if (params['repo']) {
        if (this.controlService.selectedRepository != params['repo']) {
          this.repoChange(params['repo'], false);
        }
        this.saved_filters.dt = params['dt']?params['dt'].split(',').map( Number ):[];
        this.saved_filters.actors = params['actors']?params['actors'].split(',').map( Number ):[];
        this.saved_filters.milestones = params['milestones']?params['milestones'].split(',').map( Number ):[];
        this.saved_filters.reasons = params['reasons']?params['reasons'].split(',').map( Number ):[];
        this.saved_filters.repo = params['repo'];
        console.log('parsed saved filters: ',this.saved_filters);
        this.restoreFilters();
      }
    });


  }

  ngOnDestroy() {
    this.usersub.unsubscribe();
    this.control.unsubscribe();
    this.paramSub.unsubscribe();
  }


  repoChange(repo, update_url=true) {
    this.controlService.selectedRepository = repo;
    this.deselectAll(update_url);
    this.fetchFilters();
  }
  
  fetchFilters() {
    this.filtersready = false;
    this.dataLoading = true;

    this.controlService.nodesActors = [];
    this.controlService.nodesBreakdown = [];
    this.controlService.nodesMilestones = [];
    this.controlService.nodesReasons = [];

    forkJoin([
      this.actorsService.apiRepositoryIdActorsGet(this.controlService.selectedRepository),
      this.breakdownService.apiRepositoryIdBreakdownGet(this.controlService.selectedRepository, false),
      this.milestonesService.apiRepositoryIdMilestonesGet(this.controlService.selectedRepository),
      this.reasonsService.apiRepositoryIdReasonsGet(this.controlService.selectedRepository),
      this.userdata?this.slimapi.getNewDataTemplates(DT_ID_OFFSET):of([])
    ]).subscribe({
      next: ( [ actors, breakdown, milestones, reasons, newdt ] ) => { 
        console.log("filters loaded");
        if (newdt.length>0 && breakdown.length>0) {
          breakdown[0].children.push({
            id: DT_ID_OFFSET,
            nameCS: '*** nové návrhy šablon ***',
            children: newdt
          });
        }
        this.controlService.nodesActors = actors; 
        this.controlService.nodesBreakdown = breakdown;
        this.controlService.nodesMilestones = milestones;
        this.controlService.nodesReasons = reasons;

        this.dataLoading = false;
        
        //zpozdime, aby se filtr komponenta stihla iniciovat
        setTimeout( () => { 
          this.restoreFilters(true);
          this.filtersready = true;
        } );

      },
      error: (e) => { 
        console.error('filter loading error');
        this.apiError(e); 
      },
    });

  }

  runfilter() {
    if (this.fbBreaks.selected.length==0) {
      alert("Prosím vyberte alespoň jednu datovou šablonu");
      return;
    }

    // TODO poresit lepe primo v tom combu, ale zatim takto workaround
    if (this.userdata) { // je-li prihlasen user, 
      if (this.fbMilestones.selected.length!=1) {
        alert("Prosím vyberte přesně jeden milestone (stupeň dokumentace)");
        return;
      }
    }

    // // ulozime stav filtru do sessionstorage
    // sessionStorage.setItem('treeStateBreaks', JSON.stringify(this.fbBreaks.tree.treeModel.getState()) );
    // sessionStorage.setItem('treeStateActors', JSON.stringify(this.fbActors.tree.treeModel.getState()) );
    // sessionStorage.setItem('treeStateReasons', JSON.stringify(this.fbReasons.tree.treeModel.getState()) );
    // sessionStorage.setItem('treeStateMilestones', JSON.stringify(this.fbMilestones.tree.treeModel.getState()) );

    // ulozime stav filtru do URL
    this.saveFilter2Url('/viewer');

    this.dataLoading = true;
    this.errors = [];
    this.selectedTree = this.fbBreaks.getSelectedNodeTree();
    this.selectedFlatTree = this.fbBreaks.getSelectedIdsWithInfo();
    //console.log(this.selectedTree, this.selectedFlatTree);

    this.notesReqData = [];
    if (this.userdata) { // je-li prihlasen user, dotahneme komentare z druheho api
      this.selectedMilestones = this.fbMilestones.getSelectedIdsWithInfo();
      let dt_uuids: string[] = [];
      this.selectedFlatTree.forEach( n => {
        dt_uuids.push(n.uuid);
      });
      forkJoin([
        this.slimapi.notesReqViewer(this.selectedMilestones[0].uuid, dt_uuids),
        this.slimapi.getRequirements()
      ])
      .subscribe({
        next: ([nr, allreq]) => {
          //console.log('notes4viewer',nr);
          this.notesReqData = nr;

          //console.log('list of all req', allreq);
          this.allRequiremets = {};
          // pridame class new vsem tady, protoze co budem brat odtud, tak bude nove pridana vlastnost k sablone
          allreq.forEach( r => { r['_class']=(r['_class'] || '') + " new"; this.allRequiremets[r.uuid]=r; });
          //console.log(this.allRequiremets);
          this.fetchSelectedFilters();
        }
      });
    } else {
      this.fetchSelectedFilters();
    }

  }
  
  fetchSelectedFilters() {
    if (this.reqtab == 'req') {
      this.fetchPlain().subscribe({
        next:  (r) => { this.prepareFetchedData(r) },
        error: (e) => { this.apiError(e) },
      });
    } else {
      let groupingtype:GroupingType = 'CS';
      switch (this.reqtab) {
        case "sets_cz": groupingtype='CS'; break;
        case "sets_en": groupingtype='EN'; break;
        case "sets_ifc": groupingtype='IFC'; break;
      }

      this.fetchSets(groupingtype, this.context).subscribe({
        next:  (r) => { this.prepareFetchedData(r) },
        error: (e) => { this.apiError(e) },
      }
      );
    }

  }

  prepareFetchedData(reqs) {
    // spolecne zpracovani pro req i set
    this.dataTemplates = [];

    let reqs_by_uuid = {};
    reqs.forEach( (req) => { reqs_by_uuid[req.uuid] = req; });
    this.selectedFlatTree.forEach( (dt) => {
      let req = reqs_by_uuid[dt.uuid];
      // nejdriv zjistime zda jsme dostali data k sablonam co jsme chteli
      // - nedostanem nic pokud je to prazdne a nebo pokud se jedna o DT pridane nove u nas .. v obou pripadech musime zaznam apson trosku zalozit rucne, at k nemu muzem pridavat poznamky apod
      if (!req) { 
        req = {
          id: dt.id,
          uuid: dt.uuid,
          nameCS: dt.name,
        };
        if (this.reqtab == 'req') {
          req.requirements = [];
        } else {
          req.requirementSets = [];
        }
      }

      if (req.requirementSets) {
        // pokud se jedna o skupinu co ma v nazvu obecná, tak ji chceme ve vychozim stavu sbalenou
        req.requirementSets.forEach( set => { if ( set.name.includes('obecn') || set.name.includes('klasifikace CCI') || set.name.includes('identifikace') ) (set as any).collapsed = true; });
      }
      //console.log(req.nameCS, req,  this.notesReqData[req.uuid]);
      // pokud existuji pridane poznamky v druhem api, tak pridej nove navrhy vlastnosti do dat z hlavniho api
      if (this.notesReqData[req.uuid]) {
        let add: any;
        if (req.requirementSets) {
          add = [];
          req.requirementSets.push({
            name: "nové návrhy vlastností",
            requirements: add,
            _class: "new"
          });
        } else {
          add = req.requirements;
        }
        this.notesReqData[req.uuid]['_new']?.forEach(uuid => {
          add.push( this.allRequiremets[uuid]?this.allRequiremets[uuid]:{uuid: uuid, nameCS: '!!! error - neznama vlastnost !!! Asi z novějšího IFC?' } );
        });
      }
      this.dataTemplates[req.uuid] = req;
    });

    /*
    reqs.forEach( (req) => {
      if (req.requirementSets) {
        // pokud se jedna o skupinu co ma v nazvu obecná, tak ji chceme ve vychozim stavu sbalenou
        req.requirementSets.forEach( set => { if ( set.name.includes('obecn') ) (set as any).collapsed = true; });
      }
      // pokud existuji pridane poznamky v druhem api, tak pridej nove navrhy vlastnosti do dat z hlavniho api
      if (this.notesReqData[req.uuid]) {
        let add: any;
        if (req.requirementSets) {
          add = [];
          req.requirementSets.push({
            name: "nové návrhy vlastností",
            requirements: add,
            _class: "new"
          });
        } else {
          add = req.requirements;
        }
        this.notesReqData[req.uuid]['_new'].forEach(uuid => {
          add.push( this.allRequiremets[uuid]);
        });
      }
      this.dataTemplates[req.id] = req;
    });
    */


    this.dataLoading = false;
    //console.log('dataTemplates',this.dataTemplates);

  }

  public apiError(err) {
    //console.error("CHYBA", err);
    this.errors.push('Api request failed: '+err.status+' '+err.statusText);
    this.selectedTree = null;
    this.selectedFlatTree = null;
    this.dataLoading = false;
  }


  reqtabChange(tabname:string, context:boolean) {
    this.reqtab = tabname;
    this.context = context;
    this.runfilter();
  }

  deselectAll(update_url = true) {
    this.fbBreaks?.deselectAll();
    this.fbMilestones?.deselectAll();
    this.fbReasons?.deselectAll();
    this.fbActors?.deselectAll();
    this.dataTemplates = [];
    this.selectedTree = null;
    this.selectedFlatTree = null;
    this.errors = [];
    this.saved_filters = {};
    if (update_url) this.saveFilter2Url();
  }
  
  
  prepareFilterUrl(prefix: string) {
    let filters = {}
    let dt = this.fbBreaks?.selectedIds;
    if (dt?.length) filters['dt'] = dt;
    let ac = this.fbActors?.selectedIds;
    if (ac?.length) filters['actors'] = ac;
    let mil = this.fbMilestones?.selectedIds;
    if (mil?.length) filters['milestones'] = mil;
    let rea = this.fbReasons?.selectedIds;
    if (rea?.length) filters['reasons'] = rea;

    //console.log(filters);

    return this.router.createUrlTree([ prefix, this.controlService.selectedRepository, filters  ] ).toString() ;
  }

  saveFilter2Url(prefix: string = '/filter') {
    this.location.replaceState( this.prepareFilterUrl(prefix)  );

  }

  restoreFilters(force:boolean = false) {
    console.info('restoreFilters fired');
    console.info(this.filtersready, this.saved_filters);
    // obnovuprovadime kdyz mame co obnovovat a soucasne jsou dotazene filtry
    if (force || ( this.filtersready && this.saved_filters.repo ) ) {
      //console.log(this.saved_filters.dt.reduce((acc, key) => ({...acc, [key]: true}), {}));
      //this.fbBreaks.tree.treeModel.setState({ selectedLeafNodeIds: this.saved_filters.dt.reduce((acc, key) => ({...acc, [key]: true}), {}) });
      this.fbBreaks.restoreSelected(this.saved_filters.dt);
      this.fbActors.restoreSelected(this.saved_filters.actors);
      this.fbReasons.restoreSelected(this.saved_filters.reasons);
      this.fbMilestones.restoreSelected(this.saved_filters.milestones);
      console.info('state restored');
      this.saveFilter2Url();
    } else {
      console.warn('not ready for restore');
    }
  }


  exportIFCactors = '';
  exportIFCreasons = '';
  exportIFCbreakdowns = '';
  exportIFCmilestones = '';
  exportIFCurl = '';
  exportIFC() {
    if (this.fbBreaks.selected.length==0) {
      alert("Prosím vyberte alespoň jednu datovou šablonu");
      return;
    }


    let filteredBreakdowns = this.fbBreaks.getSelectedIds().filter((id) => { return (id < DT_ID_OFFSET); });

    this.exportIFCactors = this.fbActors?.getSelectedIds().join(',');
    this.exportIFCreasons = this.fbReasons?.getSelectedIds().join(',');
    this.exportIFCbreakdowns = filteredBreakdowns.join(',');
    this.exportIFCmilestones = this.fbMilestones?.getSelectedIds().join(',');
    this.exportIFCurl = location.origin + this.prepareFilterUrl('/viewer');

    console.info(this.exportifcform);

    setTimeout(_ => this.exportifcform.nativeElement.submit()); // odesleme az v dalsim ticku, jinak tam nejsou hodnoty

/*     this.requirementsService.apiRepositoryIdRequirementsExportGet(
      this.controlService.selectedRepository,
      window.location.href,
      this.fbActors?.getSelectedIds().join(','),
      this.fbReasons?.getSelectedIds().join(','),
      filteredBreakdowns.join(','),
      this.fbMilestones?.getSelectedIds().join(','),
      'response',
    ).subscribe({
      next: (r) => {
        console.log(r);
      },
      error: (e) => { this.apiError(e) },
    }); */

/* 
    let url:string = '/api/'+this.controlService.selectedRepository+'/requirements/export?'+
      'actors='+this.fbActors?.getSelectedIds().join(',')+
      '&reasons='+this.fbReasons?.getSelectedIds().join(',')+
      '&breakdown='+filteredBreakdowns.join(',')+
      '&milestones='+this.fbMilestones?.getSelectedIds().join(',')+
      '&fromUrl='+window.location.href;

    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
    anchor.remove();
*/



    //this.$gaService.pageView('/dss-ga-test/export/ifc', 'Export IFC');
    //this.location.replaceState( this.router.createUrlTree([ '/export/ifc' ] ).toString()  );
    this.saveFilter2Url('/export/ifc');
  }

  public exportXLS() {
    if (this.fbBreaks.selected.length==0) {
      alert("Prosím vyberte alespoň jednu datovou šablonu");
      return;
    }

    this.dataLoading = true;

    //console.log('dt', this.fbBreaks.selected);
    this.selectedFlatTree = this.fbBreaks.getSelectedIdsWithInfo();
  
    let groupingtype:GroupingType = 'CS';
    let context:boolean = true;

    this.fetchSets(groupingtype, context).subscribe({
      next: (r) => {
/*         //console.log(r); 
        var data = [];
        r.forEach( (req) => {
          data[req.id] = req;
        });
        this.exportexcel.export(data, this.fbBreaks.getSelectedNodeTree() ); */

        this.prepareFetchedData(r);

        //console.log(this.dataTemplates, this.fbBreaks.getSelectedNodeTree());

        this.exportexcel.export(
            this.dataTemplates, 
            this.fbBreaks.getSelectedNodeTree(), 
            this.fbBreaks.selected, 
            this.fbActors.selected, 
            this.fbMilestones.selected, 
            this.fbReasons.selected,
            location.origin + this.prepareFilterUrl('/viewer'),
        );


        //this.$gaService.pageView('/dss-ga-test/export/xls', 'Export XLS');
        this.saveFilter2Url('/export/xls');
        //this.location.replaceState( this.router.createUrlTree([ '/export/xls' ] ).toString()  );
        this.dataLoading = false;
      },
      error: (e) => { this.apiError(e) },
     }
    );
  

  }

  public fetchPlain() {
    let filteredBreakdowns = this.fbBreaks.getSelectedIds().filter((id) => { return (id < DT_ID_OFFSET); });
    if (filteredBreakdowns.length==0) return of([]);

    return this.breakdownService.apiRepositoryIdBreakdownRequirementsGet(
      this.controlService.selectedRepository,
      null, //ordering
      this.context, //expand context
      null, //select
      null, //filter
      null, //orderby
      null, //skip
      null, //top
      null, //apply
      this.fbActors.getSelectedIds().join(','), //actors
      this.fbReasons.getSelectedIds().join(','), //reasons
      //this.fbBreaks.getSelectedIds().join(','), //breakdowns
      filteredBreakdowns.join(','), //breakdowns
      this.fbMilestones.getSelectedIds().join(','), //milestones
    );
  }

  public fetchSets(groupingtype:GroupingType, context: boolean): Observable<any>  {
    let filteredBreakdowns = this.fbBreaks.getSelectedIds().filter((id) => { return (id < DT_ID_OFFSET); });
    if (filteredBreakdowns.length==0) return of([]);

    return this.breakdownService.apiRepositoryIdBreakdownRequirementSetsGet(
      this.controlService.selectedRepository, 
      groupingtype, //grouping type
      context, // expand context 
      null, //select
      null, //filter
      null, //orderby
      null, //skip
      null, //top
      null, // apply
      this.fbActors.getSelectedIds().join(','), //actors
      this.fbReasons.getSelectedIds().join(','), //reasons
      filteredBreakdowns.join(','), //breakdowns
      this.fbMilestones.getSelectedIds().join(','), //milestones
    );
  }

  newDtDone = (uuid:string): void => { 
    if (uuid) this.fetchFilters();
    this.modal.close('modal-new-dt');
  }

  public bmname: string;
  addBookmark(name: string) {
    console.info("adding bookmark", name);
    if (!name || name=='') return false;
    this.bookmarkService.addBookmark({ 
      name: name,
      repo: this.controlService.selectedRepository,
      dt: this.fbBreaks.selectedIds,
      actors: this.fbActors.selectedIds,
      milestones: this.fbMilestones.selectedIds,
      reasons: this.fbReasons.selectedIds,
    });
  }
  restoreBookmark(bm: Bookmark) {
    console.log('[restoreBookmark]  restore TODO', bm);
    this.repoChange(bm.repo);
    this.saved_filters.dt = bm.dt;
    this.saved_filters.actors = bm.actors;
    this.saved_filters.milestones = bm.milestones;
    this.saved_filters.reasons = bm.reasons;
    this.saved_filters.repo = bm.repo;
    this.controlService.selectedRepository  = bm.repo;
  }

}



