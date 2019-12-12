import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AddactivitiesPage } from './addactivities.page';
var routes = [
    {
        path: '',
        component: AddactivitiesPage
    }
];
var AddactivitiesPageModule = /** @class */ (function () {
    function AddactivitiesPageModule() {
    }
    AddactivitiesPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [AddactivitiesPage]
        })
    ], AddactivitiesPageModule);
    return AddactivitiesPageModule;
}());
export { AddactivitiesPageModule };
//# sourceMappingURL=addactivities.module.js.map