import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { KebijakanprivasiPage } from './kebijakanprivasi.page';
var routes = [
    {
        path: '',
        component: KebijakanprivasiPage
    }
];
var KebijakanprivasiPageModule = /** @class */ (function () {
    function KebijakanprivasiPageModule() {
    }
    KebijakanprivasiPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [KebijakanprivasiPage]
        })
    ], KebijakanprivasiPageModule);
    return KebijakanprivasiPageModule;
}());
export { KebijakanprivasiPageModule };
//# sourceMappingURL=kebijakanprivasi.module.js.map