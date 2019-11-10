import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingPage } from './edit-booking.page';

describe('EditBookingPage', () => {
  let component: EditBookingPage;
  let fixture: ComponentFixture<EditBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBookingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
