import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignservicePage } from './assignservice.page';

describe('AssignservicePage', () => {
  let component: AssignservicePage;
  let fixture: ComponentFixture<AssignservicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignservicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignservicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
