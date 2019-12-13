import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelIntervalPage } from './model-interval.page';

describe('ModelIntervalPage', () => {
  let component: ModelIntervalPage;
  let fixture: ComponentFixture<ModelIntervalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelIntervalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelIntervalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
