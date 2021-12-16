import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MadDetailFromRouterComponent } from './mad-detail-from-router.component';

describe('MadDetailFromRouterComponent', () => {
  let component: MadDetailFromRouterComponent;
  let fixture: ComponentFixture<MadDetailFromRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MadDetailFromRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MadDetailFromRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
