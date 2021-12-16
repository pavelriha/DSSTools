import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadTableCellComponent } from './mad-table-cell.component';

describe('MadTableCellComponent', () => {
  let component: MadTableCellComponent;
  let fixture: ComponentFixture<MadTableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadTableCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadTableCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
