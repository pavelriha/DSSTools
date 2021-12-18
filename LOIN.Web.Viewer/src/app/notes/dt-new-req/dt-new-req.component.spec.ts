import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtNewReqComponent } from './dt-new-req.component';

describe('DtNewReqComponent', () => {
  let component: DtNewReqComponent;
  let fixture: ComponentFixture<DtNewReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtNewReqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtNewReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
