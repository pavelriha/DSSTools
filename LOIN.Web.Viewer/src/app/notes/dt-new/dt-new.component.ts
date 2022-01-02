import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/shared/services/control.service';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';

@Component({
  selector: 'app-dt-new',
  templateUrl: './dt-new.component.html',
  styleUrls: ['./dt-new.component.scss']
})
export class DtNewComponent implements OnInit {

  @ViewChild('editform') editform: NgForm;
  public error: string;
  public formdata: any = {};

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
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      //this.editform.form.markAllAsTouched(); //PR bez BS to muzem delat pres styly
      return false;
    }
    this.formdata.type = "request-new-dt";
    //console.log(this.formdata);
    //console.log(this.editform.value);
    this.slimapi.notesDtInsert(this.formdata).subscribe({
      next: (r) => {
      console.log(r);
      this.router.navigate(['/']);
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
