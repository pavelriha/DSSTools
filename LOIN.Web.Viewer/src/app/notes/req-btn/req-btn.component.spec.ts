import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqBtnComponent } from './req-btn.component';

describe('ReqBtnComponent', () => {
  let component: ReqBtnComponent;
  let fixture: ComponentFixture<ReqBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
