import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FileSizeFormatPipe } from './file-size-format.pipe';
import { EditproductPage } from './editproduct.page';

const routes: Routes = [
  {
    path: '',
    component: EditproductPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditproductPage,FileSizeFormatPipe]
})
export class EditproductPageModule {}
