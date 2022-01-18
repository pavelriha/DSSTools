import { Component, Input, OnInit } from '@angular/core';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';
import { GrouppedRequirements, GrouppedRequirementSets, Requirement } from 'src/app/swagger';

@Component({
  selector: 'dt-new-req',
  templateUrl: './dt-new-req.component.html',
  styleUrls: ['./dt-new-req.component.scss']
})
export class DtNewReqComponent implements OnInit {
  @Input() milestones: any[];
  @Input() dt_data: any;//GrouppedRequirements|GrouppedRequirementSets;
  requirements: Requirement[];
  public selectedRequirement = [];
  //public selectedRequirement = [ { "uuid": "b3feb2c1-7218-11ec-8a08-fe80808080b0", "nameCS": "magie budovy" }];
  public formNewReq: boolean = false;
  public formNewReq_name: string;

  constructor(
    private slimapi: SlimapiService,
  ) { }

  ngOnInit(): void {
    //console.log('dt-new-req init', this.milestones,  this.dt_data);
    //this.loadReq();
  }
  
  ngOnChanges() {
    //console.log('dt-new-req onChanges', this.milestones,  this.dt_data);
    this.dt_data && this.loadReq();
  }

  loadReq(): void {
    console.log("dt-new-req loadReq");
    this.slimapi.getRequirements().subscribe({
      next: (r) => {
        let dt_req: string[] = []; // priprav pole existujicich vlastnosti, at v tom muzem snaz hledat
        if (this.dt_data) {
          if (this.dt_data.requirements) this.dt_data.requirements.forEach(element => dt_req.push(element.uuid) );
          if (this.dt_data.requirementSets) this.dt_data.requirementSets.forEach(rs => {
            if (rs.requirements) rs.requirements.forEach(element => dt_req.push(element.uuid) );
          }); 
        }
        // existujici vlastnosti "vypni", at je nenabizime
        //r.forEach( onereq => { if (dt_req.includes(onereq.uuid)) onereq['disabled'] = true });
        r.forEach( onereq => { if (dt_req.includes(onereq.uuid)) onereq['in_dt'] = true });

        this.requirements = r;
      }
    })
  }

  newReqOpen = (name:string) => {
    console.log('newReqOpen', name);
    this.formNewReq_name = name;
    this.formNewReq = true;
  }

  newReqClose = (uuid:string, name:string) => {
    //console.log('newReqClose', uuid);
    if (uuid) {
      this.loadReq();
      //this.selectedRequirement = { uuid: uuid, nameCS: name };
      this.selectedRequirement.push( { uuid: uuid, nameCS: name } );
    }
    this.formNewReq=false;
  }

  compare(a, b) {
   // return a.name==b.uuid;
    return a.uuid==b.uuid;
  }

}
