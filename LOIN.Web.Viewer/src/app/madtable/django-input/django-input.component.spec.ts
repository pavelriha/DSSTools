import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DjangoInputComponent } from './django-input.component';

describe('DjangoInputComponent', () => {
  let component: DjangoInputComponent;
  let fixture: ComponentFixture<DjangoInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DjangoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjangoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
