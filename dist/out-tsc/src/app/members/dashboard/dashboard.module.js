import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardPage } from './dashboard.page';
var routes = [
    {
        path: 'dashboard',
        component: DashboardPage,
        children: [
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
        path: "",
        redirectTo: 'dashboard/main',
        pathMatch: "full"
    }
];
var DashboardPageModule = /** @class */ (function () {
    function DashboardPageModule() {
    }
    DashboardPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DashboardPage]
        })
    ], DashboardPageModule);
    return DashboardPageModule;
}());
export { DashboardPageModule };
//# sourceMappingURL=dashboard.module.js.map