import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ControlService } from 'src/app/shared/services/control.service';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';

@Component({
  selector: 'notes-dt-new',
  templateUrl: './dt-new.component.html',
  styleUrls: ['./dt-new.component.scss']
})
export class DtNewComponent implements OnInit {

  @ViewChild('editform') editform: NgForm;
  @Input() finish: (string?) =>void;
  public error: string;
  public formdata: any = {};
  private submitInProgress: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slimapi: SlimapiService,
    private controlService: ControlService,
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    // ochrana proti vicenasobnemu kliknuti
    if (this.submitInProgress) return false;
    this.submitInProgress = true;

    this.error = '';
    if (this.editform.invalid) {
      alert("formular obsahuje chyby");
      //this.editform.form.markAllAsTouched(); //PR bez BS to muzem delat pres styly
      this.submitInProgress = false;
      return false;
    }
    this.formdata.type = "request-new-dt";
    this.formdata.repository = this.controlService.selectedRepository;
    //console.log(this.formdata);
    //console.log(this.editform.value);
    this.slimapi.notesDtInsert(this.formdata).subscribe({
      next: (r) => {
        //console.log(r,r.data.dt_uuid);
        this.formdata = {};
        this.editform.resetForm();
        this.submitInProgress = false;

        //this.router.navigate(['/']);
        if (typeof this.finish == "function") this.finish(r.data.dt_uuid);
        //this.controlService.control.next('note-submited');
      },
      error: (e) => {
        //console.log(e);
        this.error = e.error.message;
        this.submitInProgress = false;
      }
    });
  }

}
