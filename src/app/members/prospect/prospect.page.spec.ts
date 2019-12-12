// Import untuk membuat dan menginput angular/core dalam prospect page


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspectPage } from './prospect.page';

describe('ProspectPage', () => {
  let component: ProspectPage;
  let fixture: ComponentFixture<ProspectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
