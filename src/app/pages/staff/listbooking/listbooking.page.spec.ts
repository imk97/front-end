import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbookingPage } from './listbooking.page';

describe('ListbookingPage', () => {
  let component: ListbookingPage;
  let fixture: ComponentFixture<ListbookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbookingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
