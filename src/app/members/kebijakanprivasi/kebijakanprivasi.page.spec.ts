import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KebijakanprivasiPage } from './kebijakanprivasi.page';

describe('KebijakanprivasiPage', () => {
  let component: KebijakanprivasiPage;
  let fixture: ComponentFixture<KebijakanprivasiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KebijakanprivasiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KebijakanprivasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
