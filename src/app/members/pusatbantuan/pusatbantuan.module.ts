import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PusatbantuanPage } from './pusatbantuan.page';

const routes: Routes = [
  {
    path: '',
    component: PusatbantuanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PusatbantuanPage]
})
export class PusatbantuanPageModule {}
