import { Component, OnInit, Input } from '@angular/core';
//import { MadService } from '../mad.service';
import { MadTableCell } from '../madtablecell.class';

@Component({
  selector: 'django-value',
  templateUrl: './django-value.component.html',
  styleUrls: ['./django-value.component.scss']
})
export class DjangoValueComponent extends MadTableCell implements OnInit {

  constructor(
  //private madservice: MadService,
  ) { 
    super();
  }

  ngOnInit() {
  }

  getValue(dd:Array<any>, name:string) {
    name.split('.').forEach(s => { dd = dd[s] });
    return dd;
  }

  findChoice(choices, value) {
    if (!choices) return value;
	var el = choices.find( (e) => { return e.value == value } );
	if (el) return el.display_name;
	return value;
  }

}
