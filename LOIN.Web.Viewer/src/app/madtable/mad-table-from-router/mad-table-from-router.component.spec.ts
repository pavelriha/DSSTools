import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MadTableFromRouterComponent } from './mad-table-from-router.component';

describe('MadTableFromRouterComponent', () => {
  let component: MadTableFromRouterComponent;
  let fixture: ComponentFixture<MadTableFromRouterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MadTableFromRouterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MadTableFromRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
