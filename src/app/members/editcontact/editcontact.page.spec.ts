import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcontactPage } from './editcontact.page';

describe('EditcontactPage', () => {
  let component: EditcontactPage;
  let fixture: ComponentFixture<EditcontactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontactPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
