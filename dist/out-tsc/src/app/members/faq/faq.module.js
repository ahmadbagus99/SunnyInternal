import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FaqPage } from './faq.page';
var routes = [
    {
        path: '',
        component: FaqPage
    }
];
var FaqPageModule = /** @class */ (function () {
    function FaqPageModule() {
    }
    FaqPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FaqPage]
        })
    ], FaqPageModule);
    return FaqPageModule;
}());
export { FaqPageModule };
//# sourceMappingURL=faq.module.js.map