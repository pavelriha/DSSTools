import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { SlimapiService } from '../shared/services/slimapi.service';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public userData;
  public oldPasswd: string;
  public newPasswd1: string;
  public newPasswd2: string;
  public error: boolean = false;
  public done: boolean = false;
  @ViewChild('passwordform') passwordform: NgForm;

  constructor(
    private authService: AuthService,
    private slimapi: SlimapiService,
  ) { }

  ngOnInit(): void {
    this.userData = this.authService.getUser();
  }

  onSubmit() {
    this.error = false;
    if (this.passwordform.invalid) {
        // direktiva co nam nastavuje BS error classy, tak pracuje s !touched a neumim to tam dat jeste dle submited, takze zatim jedine reseni je udelat vsem touch 
        this.passwordform.form.markAllAsTouched();
        return false;
    }
    
    if (this.newPasswd1!=this.newPasswd2) {
      alert("zadané hesla se neshodují!");
      return false;
    }

    this.slimapi.passwd(this.oldPasswd, this.newPasswd1).subscribe(
        r => {
            console.log('password change successful');
            this.passwordform.resetForm();
            this.done = true;
        },
        e => { 
            this.error = true;
        }
    );
  }



}
