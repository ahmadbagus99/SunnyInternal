import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TopPage } from './top.page';
var routes = [
    {
        path: '',
        component: TopPage
    }
];
var TopPageModule = /** @class */ (function () {
    function TopPageModule() {
    }
    TopPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TopPage]
        })
    ], TopPageModule);
    return TopPageModule;
}());
export { TopPageModule };
//# sourceMappingURL=top.module.js.map