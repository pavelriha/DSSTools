import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DjangoValueComponent } from './django-value.component';

describe('DjangoValueComponent', () => {
  let component: DjangoValueComponent;
  let fixture: ComponentFixture<DjangoValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DjangoValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjangoValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
