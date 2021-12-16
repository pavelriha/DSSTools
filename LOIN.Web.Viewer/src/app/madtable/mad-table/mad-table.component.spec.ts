import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MadTableComponent } from './mad-table.component';

describe('MadTableComponent', () => {
  let component: MadTableComponent;
  let fixture: ComponentFixture<MadTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
