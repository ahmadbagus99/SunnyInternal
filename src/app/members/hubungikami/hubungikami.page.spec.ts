import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubungikamiPage } from './hubungikami.page';

describe('HubungikamiPage', () => {
  let component: HubungikamiPage;
  let fixture: ComponentFixture<HubungikamiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubungikamiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubungikamiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
