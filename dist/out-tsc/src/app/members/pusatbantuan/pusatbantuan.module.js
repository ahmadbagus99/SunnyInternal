import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PusatbantuanPage } from './pusatbantuan.page';
var routes = [
    {
        path: '',
        component: PusatbantuanPage
    }
];
var PusatbantuanPageModule = /** @class */ (function () {
    function PusatbantuanPageModule() {
    }
    PusatbantuanPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PusatbantuanPage]
        })
    ], PusatbantuanPageModule);
    return PusatbantuanPageModule;
}());
export { PusatbantuanPageModule };
//# sourceMappingURL=pusatbantuan.module.js.map