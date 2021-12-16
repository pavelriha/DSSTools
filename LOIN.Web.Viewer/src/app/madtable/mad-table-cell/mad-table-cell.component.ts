import {
    Component,
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory,
    Input,
    OnInit,
    OnChanges,
    AfterViewInit,
    ChangeDetectorRef
} from '@angular/core';
import { MadTableCell } from '../madtablecell.class';

@Component({
  selector: 'mad-table-cell',
  template: '<template #dyn></template>',
  //templateUrl: './mad-table-cell.component.html',
  //styleUrls: ['./mad-table-cell.component.scss']
})
export class MadTableCellComponent extends MadTableCell implements OnChanges, AfterViewInit {

  @ViewChild('dyn', { read: ViewContainerRef }) entry: ViewContainerRef;
  @Input() conf;
  
  
  componentRef: any;
  
  constructor(
    private resolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
  ) { 
    super(); //In ES6, derived classes have to call super() if they have a constructor.
  }

  ngAfterViewInit(): void {
        this.entry.clear();
        //console.log(this.item.name, this.item.type, ' | Typeof: ', typeof(this.item.type),  ' | Desc: ', this.desc.properties[this.item.name]);
        //console.log(this.item);

        let type = this.item.type;
        //console.log(this.conf);
        
        if (!type) type = this.desc.properties[this.item.name]?.type;
        if (typeof(type) === 'string') { 
          //console.log(this.item.name, ' type is STRING -->', type); 
          let t = this.conf.cell_type_map[type];
          if (t) {
              type = t;
          } else {
              console.error('[MADCELL] type not found for coname=',this.item.name, ' | coltype=', type);
              type = this.conf.cell_type_default_component;
          }
          //console.info(t);
        }
        if (!type) type = this.conf.cell_type_default_component;
        //console.info(this.item.name, type );        
        
        const factory = this.resolver.resolveComponentFactory(type);
        this.componentRef = this.entry.createComponent(factory);
//        console.info('instance', this.componentRef.instance);
        this.pushinput();
/*        
        if (this.componentRef.instance.output) {
            this.componentRef.instance.output.subscribe(d => { console.log('output subscriber!', d); } );
        }
        // v komponente
        //@Output() output = new EventEmitter(); this.output.emit('xx');
*/
        
        this.changeDetectorRef.detectChanges(); // bez toho to haze chybu "Expression has changed after it was checked."
        
  }
  
  private pushinput() {
        this.componentRef.instance.data = this.data;
        this.componentRef.instance.desc = this.desc;
        this.componentRef.instance.item = this.item;
        //if (this.componentRef.instance.reload) console.log('reload found');
        //this.componentRef.instance.reload = ()=>{ console.log('CELL fce activated'); this.reload(); };
        this.componentRef.instance.reload = this.reload;
        this.componentRef.instance.setLoading = this.setLoading;
        this.componentRef.instance.edit = this.edit;
  }
  
  ngOnChanges() {
    // INPUT var nejsou bohuzel bindovane, ani zjevne predane pres odkaz, takze je nutne je tam znovu poslat pri zmene  
    if (this.componentRef) { this.pushinput() }
  }

  
    // zda se ze neni potreba nejak manualne volat destroy
//  destroyComponent() {
//    this.componentRef.destroy();
//  }
  
  
}
