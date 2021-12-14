import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqNotesComponent } from './req-notes.component';

describe('ReqNotesComponent', () => {
  let component: ReqNotesComponent;
  let fixture: ComponentFixture<ReqNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
