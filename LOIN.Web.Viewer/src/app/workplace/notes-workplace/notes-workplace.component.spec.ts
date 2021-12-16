import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesWorkplaceComponent } from './notes-workplace.component';

describe('NotesWorkplaceComponent', () => {
  let component: NotesWorkplaceComponent;
  let fixture: ComponentFixture<NotesWorkplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesWorkplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesWorkplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
