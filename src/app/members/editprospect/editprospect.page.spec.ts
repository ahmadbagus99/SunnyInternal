import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprospectPage } from './editprospect.page';

describe('EditprospectPage', () => {
  let component: EditprospectPage;
  let fixture: ComponentFixture<EditprospectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprospectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprospectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
