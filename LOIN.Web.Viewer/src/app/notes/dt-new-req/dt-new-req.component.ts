import { Component, OnInit } from '@angular/core';
import { SlimapiService } from 'src/app/shared/services/slimapi.service';
import { Requirement } from 'src/app/swagger';

@Component({
  selector: 'dt-new-req',
  templateUrl: './dt-new-req.component.html',
  styleUrls: ['./dt-new-req.component.scss']
})
export class DtNewReqComponent implements OnInit {
  requirements: Requirement[];

  constructor(
    private slimapi: SlimapiService,
  ) { }

  ngOnInit(): void {
    this.slimapi.getRequirements().subscribe({
      next: (r) => {
        console.log(r);
        this.requirements = r;
      }
    })
  }

}
