import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ProspectPage } from './prospect.page';
var routes = [
    {
        path: '',
        component: ProspectPage
    }
];
var ProspectPageModule = /** @class */ (function () {
    function ProspectPageModule() {
    }
    ProspectPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ProspectPage]
        })
    ], ProspectPageModule);
    return ProspectPageModule;
}());
export { ProspectPageModule };
//# sourceMappingURL=prospect.module.js.map