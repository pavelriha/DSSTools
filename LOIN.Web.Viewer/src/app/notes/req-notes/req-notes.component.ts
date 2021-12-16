import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';
import { Requirement } from 'src/app/swagger';
import { isFunction } from 'util';

@Component({
  selector: 'req-notes',
  templateUrl: './req-notes.component.html',
  styleUrls: ['./req-notes.component.scss']
})
export class ReqNotesComponent implements OnInit {

  @ViewChild('editform') editform: NgForm;
  private paramSub: any;
  public requirements: any;// Requirement;

  public formdata: any = {};
  @Input() milestones: any[];
  @Input() dt_uuid: string;
  @Input() req_uuid: string;
  @Input() success: () => void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
  ) { }

  ngOnInit(): void {
/*     this.paramSub = this.route.params.subscribe(params => {
      this.formdata.dt_uuid = params['dt_uuid'];
      this.formdata.req_uuid = params['req_uuid'];
    }); */
/*     this.requirements = <Requirement>this.route.paramMap
    .pipe(map(() => window.history.state.requirements)); */


    //this.requirements = window.history.state.requirements;

  }

  public onSubmit() {
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      return false;
    }
    this.formdata.milestone_uuid = this.milestones[0].uuid;
    this.formdata.dt_uuid = this.dt_uuid;
    this.formdata.req_uuid = this.req_uuid;
    //console.log(this.formdata);
    //console.log(this.editform.value);
    this.slimapi.notesReqInsert(this.formdata).subscribe( r => {
      console.log(r);
      //this.router.navigate(['/']);
      if (this.success) this.success();
    });
  }

}
