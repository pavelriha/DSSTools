import { Component, Input, OnInit } from '@angular/core';
import { ControlService } from 'src/app/shared/services/control.service';
import { Requirement } from 'src/app/swagger';
import { NotesReq } from '../notesReq.model';

@Component({
  selector: 'notes-req-btn',
  templateUrl: './req-btn.component.html',
  styleUrls: ['./req-btn.component.scss']
})
export class ReqBtnComponent implements OnInit {

  @Input('dt_uuid') dt_uuid: string;
  @Input('req_uuid') req_uuid: string;
  @Input('requirements') requirements: Requirement;
  @Input() notes: NotesReq[];

  constructor(
    private controlService: ControlService,
  ) { }

  ngOnInit(): void {
  }

  notesReqSubmit = () => {
    this.controlService.control.next('reload-view');
  }


}
