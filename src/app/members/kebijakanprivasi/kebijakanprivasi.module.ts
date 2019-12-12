import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { KebijakanprivasiPage } from './kebijakanprivasi.page';

const routes: Routes = [
  {
    path: '',
    component: KebijakanprivasiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [KebijakanprivasiPage]
})
export class KebijakanprivasiPageModule {}
