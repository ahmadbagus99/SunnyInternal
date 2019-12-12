import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EdituserPage } from './edituser.page';
var routes = [
    {
        path: '',
        component: EdituserPage
    }
];
var EdituserPageModule = /** @class */ (function () {
    function EdituserPageModule() {
    }
    EdituserPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EdituserPage]
        })
    ], EdituserPageModule);
    return EdituserPageModule;
}());
export { EdituserPageModule };
//# sourceMappingURL=edituser.module.js.map