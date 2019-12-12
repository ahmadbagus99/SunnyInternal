import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { IonicModule } from '@ionic/angular';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    children : [
      { 
        path: 'main', 
        loadChildren: '../main/main.module#MainPageModule' 
      },
      { 
        path: 'myaccount', 
       loadChildren: '../myaccount/myaccount.module#MyaccountPageModule' 
      },
      { 
        path: 'notifications', 
        loadChildren: '../notifications/notifications.module#NotificationsPageModule' 
      },
      { path: 'profile', 
        loadChildren: '../profile/profile.module#ProfilePageModule' 
      }
    ]
  },
  {
    path : "",
    redirectTo : 'dashboard/main',
    pathMatch : "full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
