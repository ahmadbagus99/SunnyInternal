import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HubungikamiPage } from './hubungikami.page';
var routes = [
    {
        path: '',
        component: HubungikamiPage
    }
];
var HubungikamiPageModule = /** @class */ (function () {
    function HubungikamiPageModule() {
    }
    HubungikamiPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [HubungikamiPage]
        })
    ], HubungikamiPageModule);
    return HubungikamiPageModule;
}());
export { HubungikamiPageModule };
//# sourceMappingURL=hubungikami.module.js.map