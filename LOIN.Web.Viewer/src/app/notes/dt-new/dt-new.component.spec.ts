import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtNewComponent } from './dt-new.component';

describe('DtNewComponent', () => {
  let component: DtNewComponent;
  let fixture: ComponentFixture<DtNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
