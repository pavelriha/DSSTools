import { Injectable, Directive, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges } from '@angular/core';

/*
 * bez ng dekoratoru ne nejde prelozit, logicke by bylo @component ale prej to ma neco z konstruktorem, 
 * tak asi @Injectable .. to prelozi, ale hazi to pak chyby
 * @Directive nezni moc logicky, ale funguje ..
 */
//@Injectable()
@Directive()
export class MadTableCell {
  @Input() data;
  @Input() desc;
  @Input() item; // cell config
  @Input() reload: () => void;
  @Input() setLoading: (l: boolean) => void;
  //@Input() edit; // input mode
  // u dynamicke komponenty nefunguje ngOnChanges, tak ho vyvolame umele pres getter/setter
  @Input()  get edit(): boolean { return this._edit; }
  set edit(state: boolean) {
    if (this._edit === state) { return };
    this._edit = state;
    //console.log('edit setter', state);
    if (this.ngOnChanges) this.ngOnChanges();
    //this.changeDetectorRef.markForCheck();
  }
  private _edit = false;
  
  
  //@Output() reload = new EventEmitter();
  
   constructor(
    //private changeDetectorRef: ChangeDetectorRef,
  ) { }
  
  ngOnChanges() {}
}
