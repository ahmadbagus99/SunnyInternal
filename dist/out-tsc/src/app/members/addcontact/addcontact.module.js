import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddcontactPage } from './addcontact.page';
var routes = [
    {
        path: '',
        component: AddcontactPage
    }
];
var AddcontactPageModule = /** @class */ (function () {
    function AddcontactPageModule() {
    }
    AddcontactPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddcontactPage]
        })
    ], AddcontactPageModule);
    return AddcontactPageModule;
}());
export { AddcontactPageModule };
//# sourceMappingURL=addcontact.module.js.map