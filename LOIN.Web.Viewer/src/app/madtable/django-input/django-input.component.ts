import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'django-input',
  templateUrl: './django-input.component.html',
  styleUrls: ['./django-input.component.scss']
})
export class DjangoInputComponent implements OnInit {
  @Input('desc') dataDescription: any;
  @Input('item') item: any;
  @Input('data') data: any;
  @Input('compact') compact: boolean;

  constructor() { }

  ngOnInit() {
  }

}
