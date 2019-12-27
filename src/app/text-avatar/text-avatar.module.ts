import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TextAvatarDirective } from './text-avatar';
import { CommonModule } from '@angular/common';
import { ColorGenerator } from './color-generator';

@NgModule({
  imports: [CommonModule],
  declarations: [TextAvatarDirective],
  exports: [TextAvatarDirective],
  providers: [ColorGenerator],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class TextAvatarModule {}