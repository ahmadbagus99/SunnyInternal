import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MyaccountPage } from './myaccount.page';
var routes = [
    {
        path: '',
        component: MyaccountPage
    }
];
var MyaccountPageModule = /** @class */ (function () {
    function MyaccountPageModule() {
    }
    MyaccountPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MyaccountPage]
        })
    ], MyaccountPageModule);
    return MyaccountPageModule;
}());
export { MyaccountPageModule };
//# sourceMappingURL=myaccount.module.js.map