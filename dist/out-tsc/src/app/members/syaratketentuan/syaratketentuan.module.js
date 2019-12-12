import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SyaratketentuanPage } from './syaratketentuan.page';
var routes = [
    {
        path: '',
        component: SyaratketentuanPage
    }
];
var SyaratketentuanPageModule = /** @class */ (function () {
    function SyaratketentuanPageModule() {
    }
    SyaratketentuanPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SyaratketentuanPage]
        })
    ], SyaratketentuanPageModule);
    return SyaratketentuanPageModule;
}());
export { SyaratketentuanPageModule };
//# sourceMappingURL=syaratketentuan.module.js.map