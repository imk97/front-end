import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailuserPage } from './detailuser.page';

describe('DetailuserPage', () => {
  let component: DetailuserPage;
  let fixture: ComponentFixture<DetailuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
