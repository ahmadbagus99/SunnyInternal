import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PusatbantuanPage } from './pusatbantuan.page';

describe('PusatbantuanPage', () => {
  let component: PusatbantuanPage;
  let fixture: ComponentFixture<PusatbantuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PusatbantuanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PusatbantuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
