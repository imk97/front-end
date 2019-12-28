import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModelPage } from './update-model.page';

describe('UpdateModelPage', () => {
  let component: UpdateModelPage;
  let fixture: ComponentFixture<UpdateModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
