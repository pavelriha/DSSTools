import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegBtnComponent } from './reg-btn.component';

describe('RegBtnComponent', () => {
  let component: RegBtnComponent;
  let fixture: ComponentFixture<RegBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
