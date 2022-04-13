import { Component, OnInit } from '@angular/core';
import { ControlService } from '../shared/services/control.service';
import { ReasonsService } from '../swagger';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss']
})
export class WorkplaceComponent implements OnInit {

  constructor(
    public controlService: ControlService,
    private reasonsService: ReasonsService,
  ) { }

  ngOnInit(): void {

    this.reasonsService.apiRepositoryIdReasonsGet(this.controlService.selectedRepository??'latest').subscribe({
      next: (reasons) => {
        this.controlService.nodesReasons = reasons;
      }
    });

  }

}
