import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddprospectPage } from './addprospect.page';
var routes = [
    {
        path: '',
        component: AddprospectPage
    }
];
var AddprospectPageModule = /** @class */ (function () {
    function AddprospectPageModule() {
    }
    AddprospectPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddprospectPage]
        })
    ], AddprospectPageModule);
    return AddprospectPageModule;
}());
export { AddprospectPageModule };
//# sourceMappingURL=addprospect.module.js.map