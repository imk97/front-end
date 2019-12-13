import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicePage } from './view-service.page';

describe('ViewServicePage', () => {
  let component: ViewServicePage;
  let fixture: ComponentFixture<ViewServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
