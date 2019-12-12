import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyaratketentuanPage } from './syaratketentuan.page';

describe('SyaratketentuanPage', () => {
  let component: SyaratketentuanPage;
  let fixture: ComponentFixture<SyaratketentuanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyaratketentuanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyaratketentuanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
