import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SeeallprospectPage } from './seeallprospect.page';

const routes: Routes = [
  {
    path: '',
    component: SeeallprospectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SeeallprospectPage]
})
export class SeeallprospectPageModule {}
