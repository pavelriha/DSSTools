import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'notes-reg-btn',
  templateUrl: './reg-btn.component.html',
  styleUrls: ['./reg-btn.component.scss']
})
export class RegBtnComponent implements OnInit {

  @Input('uuid') uuid: string;

  constructor() { }

  ngOnInit(): void {
  }

}
