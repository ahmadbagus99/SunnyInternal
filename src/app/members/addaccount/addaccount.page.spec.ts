import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaccountPage } from './addaccount.page';

describe('AddaccountPage', () => {
  let component: AddaccountPage;
  let fixture: ComponentFixture<AddaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddaccountPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
