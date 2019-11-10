import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InServicePage } from './in-service.page';

describe('InServicePage', () => {
  let component: InServicePage;
  let fixture: ComponentFixture<InServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
