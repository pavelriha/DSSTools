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
  @Input() dt_uuid: string;
  @Input() dt_data: any;//GrouppedRequirements|GrouppedRequirementSets;
  requirements: Requirement[];
  public selectedRequirement;

  constructor(
    private slimapi: SlimapiService,
  ) { }

  ngOnInit(): void {
    //console.log('dt-new-req init', this.milestones, this.dt_uuid, this.dt_data);
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
        r.forEach( onereq => { if (dt_req.includes(onereq.uuid)) onereq['disabled'] = true });

        this.requirements = r;
      }
    })
  }

}
