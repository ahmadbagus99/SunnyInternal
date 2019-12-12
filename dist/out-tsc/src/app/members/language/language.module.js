import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LanguagePage } from './language.page';
var routes = [
    {
        path: '',
        component: LanguagePage
    }
];
var LanguagePageModule = /** @class */ (function () {
    function LanguagePageModule() {
    }
    LanguagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [LanguagePage]
        })
    ], LanguagePageModule);
    return LanguagePageModule;
}());
export { LanguagePageModule };
//# sourceMappingURL=language.module.js.map