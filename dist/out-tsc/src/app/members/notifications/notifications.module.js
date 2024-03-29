import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NotificationsPage } from './notifications.page';
var routes = [
    {
        path: '',
        component: NotificationsPage
    }
];
var NotificationsPageModule = /** @class */ (function () {
    function NotificationsPageModule() {
    }
    NotificationsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [NotificationsPage]
        })
    ], NotificationsPageModule);
    return NotificationsPageModule;
}());
export { NotificationsPageModule };
//# sourceMappingURL=notifications.module.js.map