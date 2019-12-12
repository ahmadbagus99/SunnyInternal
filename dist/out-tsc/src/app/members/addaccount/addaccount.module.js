import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddaccountPage } from './addaccount.page';
var routes = [
    {
        path: '',
        component: AddaccountPage
    }
];
var AddaccountPageModule = /** @class */ (function () {
    function AddaccountPageModule() {
    }
    AddaccountPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddaccountPage]
        })
    ], AddaccountPageModule);
    return AddaccountPageModule;
}());
export { AddaccountPageModule };
//# sourceMappingURL=addaccount.module.js.map