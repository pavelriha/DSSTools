import { Component, Input, OnInit } from '@angular/core';
import { Requirement } from 'src/app/swagger';
import { NotesReq } from '../notesReq.model';

@Component({
  selector: 'notes-req-btn',
  templateUrl: './req-btn.component.html',
  styleUrls: ['./req-btn.component.scss']
})
export class ReqBtnComponent implements OnInit {

  @Input('milestones') milestones: any[];
  @Input('dt_uuid') dt_uuid: string;
  @Input('req_uuid') req_uuid: string;
  @Input() notes: NotesReq[];

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
