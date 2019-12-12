import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SyaratketentuanPage } from './syaratketentuan.page';

const routes: Routes = [
  {
    path: '',
    component: SyaratketentuanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SyaratketentuanPage]
})
export class SyaratketentuanPageModule {}
