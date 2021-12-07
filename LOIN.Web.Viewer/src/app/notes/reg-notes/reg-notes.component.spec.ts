import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNotesComponent } from './reg-notes.component';

describe('RegNotesComponent', () => {
  let component: RegNotesComponent;
  let fixture: ComponentFixture<RegNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
