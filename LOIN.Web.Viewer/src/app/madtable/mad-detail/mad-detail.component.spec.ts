import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MadDetailComponent } from './mad-detail.component';

describe('MadDetailComponent', () => {
  let component: MadDetailComponent;
  let fixture: ComponentFixture<MadDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MadDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
