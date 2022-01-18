import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/shared/services/control.service';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';

@Component({
  selector: 'new-req',
  templateUrl: './new-req.component.html',
  styleUrls: ['./new-req.component.scss']
})
export class NewReqComponent implements OnInit {

  @ViewChild('editform') editform: NgForm;
  @Input() close: (uuid?, name?)=>void;
  @Input() name: string;
  public error: string;
  public formdata: any = {};
  public datatypes: any = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
    private controlService: ControlService,
  ) { }

  ngOnInit(): void {
    this.slimapi.getDatatype().subscribe({
      next: (types) => this.datatypes = types.data
    })
  }

  public onSubmit() {
    this.error = '';
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      //this.editform.form.markAllAsTouched(); //PR bez BS to muzem delat pres styly
      return false;
    }
    this.formdata.name = this.name;
    this.formdata.repository = this.controlService.selectedRepository;
    //console.log(this.formdata);
    //console.log(this.editform.value);
    this.slimapi.requirementsInsert(this.formdata).subscribe({
      next: (r) => {
      //console.log(r);
      this.close && this.close(r.data.req_uuid, r.data.name);
      //this.router.navigate(['/']);
      //if (typeof this.success == "function") this.success();
      //this.controlService.control.next('note-submited');
      },
      error: (e) => {
        //console.log(e);
        this.error = e.error.message;
      }
    });
  }
}
