import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/shared/services/control.service';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';

@Component({
  selector: 'req-notes',
  templateUrl: './req-notes.component.html',
  styleUrls: ['./req-notes.component.scss']
})
export class ReqNotesComponent implements OnInit {

  @ViewChild('editform') editform: NgForm;
  private paramSub: any;
  //public requirements: any;// Requirement;
  public error: string;

  public formdata: any = {};
  @Input() milestones: any[];
  @Input() dt_uuid: string;
  @Input() req_uuid: string;
  @Input() type: 'request-new-req'|'note';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
    private controlService: ControlService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.error = '';
    if (!this.req_uuid) {
      alert("vyberte vlastnost, kterou chcete přidat");
      return false;
    }
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      //this.editform.form.markAllAsTouched(); //PR bez BS to muzem delat pres styly
      return false;
    }
    this.formdata.milestone_uuid = this.milestones[0].uuid;
    this.formdata.dt_uuid = this.dt_uuid;
    this.formdata.req_uuid = this.req_uuid;
    this.formdata.type = this.type;
    //console.log(this.formdata);
    //console.log(this.editform.value);
    this.slimapi.notesReqInsert(this.formdata).subscribe({
      next: (r) => {
      console.log(r);
      //this.router.navigate(['/']);
      //if (typeof this.success == "function") this.success();
      this.controlService.control.next('note-submited');
      },
      error: (e) => {
        //console.log(e);
        this.error = e.error.message;
      }
    });
  }

}
