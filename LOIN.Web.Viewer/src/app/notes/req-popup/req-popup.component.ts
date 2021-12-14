import { Component, Input, OnInit } from '@angular/core';
import { NotesReq } from '../notesReq.model';

@Component({
  selector: 'notes-req-popup',
  templateUrl: './req-popup.component.html',
  styleUrls: ['./req-popup.component.scss']
})
export class ReqPopupComponent implements OnInit {

  @Input() notes: NotesReq[];

  constructor() { }

  ngOnInit(): void {
  }

}
