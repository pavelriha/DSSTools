import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'reg-notes',
  templateUrl: './reg-notes.component.html',
  styleUrls: ['./reg-notes.component.scss']
})
export class RegNotesComponent implements OnInit {

  private paramSub: any;
  public uuid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    //this.data = this.route.snapshot.data;
    this.paramSub = this.route.params.subscribe(params => {
      this.uuid = params['uuid'];
    });
  }

}
