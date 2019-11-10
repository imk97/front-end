import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InQueuePage } from './in-queue.page';

describe('InQueuePage', () => {
  let component: InQueuePage;
  let fixture: ComponentFixture<InQueuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InQueuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InQueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
