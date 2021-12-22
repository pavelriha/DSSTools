import { Component, OnInit, ViewChild } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { 
  ActorsService, BreakdownService, MilestonesService, ReasonsService, RepositoriesService, RequirementsService, RequirementSetsService,
} from './swagger/api/api';

import { GroupingType, Requirement, RequirementSet, GrouppedRequirements, GrouppedRequirementSets } from './swagger/model/models';
import { TreeModel, TreeNode, TreeComponent, ITreeOptions } from '@circlon/angular-tree-component';
import { FilterBoxComponent } from "./filter-box/filter-box.component";
import { ExportExcelService } from "./export-excel.service";
import { AuthService } from './shared/services/auth.service';
import { SlimapiService } from './shared/services/slimapi.service';
import { ControlService } from './shared/services/control.service';

export class Repolist {
  key: string;
  value: string;
}

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
  //@ViewChild('export_link') export_link: any;
  //@ViewChild('repo') fbRepo: FilterBoxComponent;
  //@ViewChild('repo') repo: nativeElement;
  public errors:string[] = [];
  public repo: string;
  public repoValue: string;
  //public help_url: string = 'https://www.koncepcebim.cz/dokumenty?dok=1063-napoveda-dss-online';
  public help_url: string = 'https://www.koncepcebim.cz/uploads/inq/files/DSS_online_pruvodce_Agentura%20CAS%20%281%29.pdf';
  public sel: string[];
/*   options = {
    useCheckbox: true
  }; */
  public ifc: boolean = false;

  public initdone: boolean = false;

  public nodesBreakdown: any[];
  public nodesActors: any[];
  public nodesMilestones: any[];
  public nodesReasons: any[];
  //public nodesRepositories: any[];
  public repolist: Repolist[];

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
    private controlService: ControlService
  ) { }

  ngOnInit(): void {
    this.repolist = [ { key:'latest', value: 'aktuální' } ]; //toto musi byt prvni!
    this.setDefaultRepo();
    this.repositoriesService.apiRepositoriesGet().subscribe(
      d => {  
        //this.repolist.push(...d.sort().reverse());
        d.sort().reverse().forEach( r => { this.repolist.push({ key: r, value: r }); });
      },
      e => { this.apiError(e); }
    );

    this.usersub = this.authService.userLogged.subscribe(ud => { 
      this.userdata = ud;
      console.log("user change", ud);
      if (ud) {
        this.setDefaultRepo(); //prihlasenej smi pracovat jen s latest, tak ho nastavime
      } else {
        this.selectedTree = null;
      }
    });

    this.control = this.controlService.control.subscribe(cmd => { 
      console.log("[app.component]", cmd);
      if (cmd=='note-submited') this.runfilter();
      
    });

    this.fetchFilters();
    this.initdone = true;

    setTimeout(() => { //zpozdime, aby se filtr komponenta stihla iniciovat
      this.fbBreaks.tree.treeModel.setState(JSON.parse(sessionStorage.getItem('treeStateBreaks')));
      this.fbActors.tree.treeModel.setState(JSON.parse(sessionStorage.getItem('treeStateActors')));
      this.fbReasons.tree.treeModel.setState(JSON.parse(sessionStorage.getItem('treeStateReasons')));
      this.fbMilestones.tree.treeModel.setState(JSON.parse(sessionStorage.getItem('treeStateMilestones')));
      console.info('state restored');
      setTimeout(() => { 
        console.info('prepare timeout fired');
        this.fbBreaks.prepareSelected(); 
        this.fbActors.prepareSelected();
        this.fbReasons.prepareSelected();
        this.fbMilestones.prepareSelected();
      },1000);//zpozdeni vterinu, jinak to ne vzdy nabehne
    });
  }

  ngOnDestroy() {
    this.usersub.unsubscribe();
  }

  private setDefaultRepo() {
    this.repo      = this.repolist[0].key;
    this.repoValue = this.repolist[0].value;
  }

  repoChange() {
    this.deselectAll();
    this.fetchFilters();
  }
  
  fetchFilters() {
    this.nodesActors = [];
    this.actorsService.apiRepositoryIdActorsGet(this.repo).subscribe({
      next: (d) => { this.nodesActors = d; },
      error: (e) => { this.apiError(e) },
    });
    this.nodesBreakdown = [];
    this.breakdownService.apiRepositoryIdBreakdownGet(this.repo, false).subscribe({
      next: (d) => {  this.nodesBreakdown = d; },
      error: (e) => { this.apiError(e) },
    });
    this.nodesMilestones = [];
    this.milestonesService.apiRepositoryIdMilestonesGet(this.repo).subscribe({
      next: (d) => {  this.nodesMilestones = d; },
      error: (e) => { this.apiError(e) },
    });
    this.nodesReasons = [];
    this.reasonsService.apiRepositoryIdReasonsGet(this.repo).subscribe({
      next: (d) => { this.nodesReasons = d; },
      error: (e) => { this.apiError(e) },
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

    // ulozime stav filtru do sessionstorage
    sessionStorage.setItem('treeStateBreaks', JSON.stringify(this.fbBreaks.tree.treeModel.getState()) );
    sessionStorage.setItem('treeStateActors', JSON.stringify(this.fbActors.tree.treeModel.getState()) );
    sessionStorage.setItem('treeStateReasons', JSON.stringify(this.fbReasons.tree.treeModel.getState()) );
    sessionStorage.setItem('treeStateMilestones', JSON.stringify(this.fbMilestones.tree.treeModel.getState()) );

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
          console.log('notes4viewer',nr);
          this.notesReqData = nr;

          console.log('list of all req', allreq);
          this.allRequiremets = {};
          allreq.forEach( r => { r['_class']="new"; this.allRequiremets[r.uuid]=r; });
          console.log(this.allRequiremets);
          this.fetchSelectedFilters();
        }
      });
    } else {
      this.fetchSelectedFilters();
    }

  }
  
  fetchSelectedFilters() {
    if (this.reqtab == 'req') {
      this.breakdownService.apiRepositoryIdBreakdownRequirementsGet(
        this.repo, 
        null, //select
        null, //filter
        null, //orderby
        null, //skip
        null, //top
        null, //apply
        this.fbActors.getSelectedIds().join(','), //actors
        this.fbReasons.getSelectedIds().join(','), //reasons
        this.fbBreaks.getSelectedIds().join(','), //breakdowns
        this.fbMilestones.getSelectedIds().join(','), //milestones
      ).subscribe({
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


      this.fetchSets(groupingtype).subscribe({
        next:  (r) => { this.prepareFetchedData(r) },
        error: (e) => { this.apiError(e) },
      }
      );
    }

  }

  prepareFetchedData(reqs) {
    // spolecne zpracovani pro req i set
    this.dataTemplates = [];
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


  reqtabChange(tabname:string) {
    this.reqtab = tabname;
    this.runfilter();
  }

  deselectAll() {
    this.fbBreaks.deselectAll();
    this.fbMilestones.deselectAll();
    this.fbReasons.deselectAll();
    this.fbActors.deselectAll();
    this.dataTemplates = [];
    this.selectedTree = null;
    this.selectedFlatTree = null;
    this.errors = [];
    sessionStorage.removeItem('treeStateBreaks');
    sessionStorage.removeItem('treeStateActors');
    sessionStorage.removeItem('treeStateReasons');
    sessionStorage.removeItem('treeStateMilestones');
  }


  exportIFC() {
    let url:string = '/api/'+this.repo+'/requirements/export?'+
      'actors='+this.fbActors?.getSelectedIds().join(',')+
      '&reasons='+this.fbReasons?.getSelectedIds().join(',')+
      '&breakdown='+this.fbBreaks?.getSelectedIds().join(',')+
      '&milestones='+this.fbMilestones?.getSelectedIds().join(',');

    let anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = '_blank';
    anchor.click();
    anchor.remove();


/*     this.export_link.href = url;
    console.log(this.export_link);
    this.export_link.nativeElement.click(); // nefunguje
*/

  }

  public exportXLS() {
    this.dataLoading = true;
  
    let groupingtype:GroupingType = 'CS';

    this.fetchSets(groupingtype).subscribe({
      next: (r) => {
        //console.log(r); 
        var data = [];
        r.forEach( (req) => {
          data[req.id] = req;
        });
        this.exportexcel.export(data, this.fbBreaks.getSelectedNodeTree() );
        this.dataLoading = false;
      },
      error: (e) => { this.apiError(e) },
     }
    );
  

  }


  public fetchSets(groupingtype:GroupingType): Observable<any>  {
    return this.breakdownService.apiRepositoryIdBreakdownRequirementSetsGet(
      this.repo, 
      groupingtype, //grouping type
      null, //select
      null, //filter
      null, //orderby
      null, //skip
      null, //top
      null, // apply
      this.fbActors.getSelectedIds().join(','), //actors
      this.fbReasons.getSelectedIds().join(','), //reasons
      this.fbBreaks.getSelectedIds().join(','), //breakdowns
      this.fbMilestones.getSelectedIds().join(','), //milestones
    );
  }

}



