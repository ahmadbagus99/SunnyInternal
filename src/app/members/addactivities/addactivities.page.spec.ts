import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactivitiesPage } from './addactivities.page';

describe('AddactivitiesPage', () => {
  let component: AddactivitiesPage;
  let fixture: ComponentFixture<AddactivitiesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddactivitiesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactivitiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
