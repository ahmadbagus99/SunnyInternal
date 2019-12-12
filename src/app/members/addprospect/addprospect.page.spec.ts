import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprospectPage } from './addprospect.page';

describe('AddprospectPage', () => {
  let component: AddprospectPage;
  let fixture: ComponentFixture<AddprospectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprospectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprospectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
