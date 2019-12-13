import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitycontrolPage } from './qualitycontrol.page';

describe('QualitycontrolPage', () => {
  let component: QualitycontrolPage;
  let fixture: ComponentFixture<QualitycontrolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualitycontrolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualitycontrolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
