import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SeeallprospectPage } from './seeallprospect.page';
var routes = [
    {
        path: '',
        component: SeeallprospectPage
    }
];
var SeeallprospectPageModule = /** @class */ (function () {
    function SeeallprospectPageModule() {
    }
    SeeallprospectPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [SeeallprospectPage]
        })
    ], SeeallprospectPageModule);
    return SeeallprospectPageModule;
}());
export { SeeallprospectPageModule };
//# sourceMappingURL=seeallprospect.module.js.map