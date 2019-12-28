import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TextAvatarDirective } from './text-avatar';

describe('TextAvatarDirective', () => {
  let component: TextAvatarDirective;
  let fixture: ComponentFixture<TextAvatarDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextAvatarDirective ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAvatarDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
