import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ControlService } from 'src/app/shared/services/control.service';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';
import { requestTypeDef } from 'src/app/workplace/mtconfig';

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

  //public formdata: any = {};
  @Input() milestones: any[];
  @Input() dt_uuid: string;
  @Input() dt_name: string;
  @Input() reqs: any[]; 
  //@Input() req_uuid: string;
  //@Input() req_name: string;
  //@Input() type: 'request-new-req'|'note';
  public suggestion: string;
  public formSent: boolean = false;
  private submitInProgress: boolean = false;
  public requestType: 'info'|'add'|'del' = 'info';
  public requestTypeOptions = requestTypeDef.options;

  public reasonList = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
    public controlService: ControlService,
  ) { }

  ngOnInit(): void {
    this.controlService.nodesReasons.forEach( r => {
      this.reasonList.push({
        uuid: r.uuid,
        name: r.nameCS,
        isSelected:false,
      });
    });
  }

  public onSubmit() {
    // ochrana proti vicenasobnemu kliknuti
    if (this.submitInProgress) return false;
    this.submitInProgress = true;

    this.error = '';
    if (this.reqs.length<1) {
      alert("vyberte alespoň jednu vlastnost, kterou chcete přidat");
      this.submitInProgress = false;
      return false;
    }
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      //this.editform.form.markAllAsTouched(); //PR bez BS to muzem delat pres styly
      this.submitInProgress = false;
      return false;
    }
    let reasons = [];
    if (this.requestType!='info') {
      this.reasonList.forEach( r => { r.isSelected && reasons.push(r.uuid) });
      console.log(reasons, reasons.join(',') );
      if (reasons.length==0) {
        alert("vyberte způsoby užití");
        this.submitInProgress = false;
        return false;
      }
    }

    // this.formdata.milestone_uuid = this.milestones[0].uuid;
    // this.formdata.milestone_name = this.milestones[0].name;
    // this.formdata.dt_uuid = this.dt_uuid;
    // this.formdata.dt_name = this.dt_name;
    // this.formdata.type = this.type;
    // this.formdata.repository = this.controlService.selectedRepository;
    //console.log(this.formdata);
    //console.log(this.editform.value);
    let masshttp = [];
    this.reqs.forEach( r => {
      masshttp.push( this.slimapi.notesReqInsert({
        milestone_uuid: this.milestones[0].uuid,
        milestone_name: this.milestones[0].name,
        dt_uuid: this.dt_uuid,
        dt_name: this.dt_name,
        req_uuid: r.uuid,
        req_name: r.nameCS,
        //type: this.type,
        type: r.in_dt?'note':'request-new-req',
        request_type: this.requestType,
        reasons: reasons.join(','),
        suggestion: this.suggestion,
        repository: this.controlService.selectedRepository
      }) );
    });

    forkJoin(masshttp).subscribe({
        next: (ret) => {
          //console.log(ret);
          //this.router.navigate(['/']);
          //if (typeof this.success == "function") this.success();
          
          this.reqs = [];
          this.editform.resetForm();
          this.formSent = true;
          setTimeout( () => { 
            console.log('timer fired, sending note-submited');
            this.controlService.control.next('note-submited'); 
          }, 500) ;
          this.submitInProgress = false;
        },
        error: (e) => {
          //console.log(e);
          this.error = e.error.message;
          this.submitInProgress = false;
        }
      });


  }

}
