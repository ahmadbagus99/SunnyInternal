import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeallprospectPage } from './seeallprospect.page';

describe('SeeallprospectPage', () => {
  let component: SeeallprospectPage;
  let fixture: ComponentFixture<SeeallprospectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeallprospectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeallprospectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
