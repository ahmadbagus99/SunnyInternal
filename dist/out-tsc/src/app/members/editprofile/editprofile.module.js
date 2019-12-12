import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditprofilePage } from './editprofile.page';
var routes = [
    {
        path: '',
        component: EditprofilePage
    }
];
var EditprofilePageModule = /** @class */ (function () {
    function EditprofilePageModule() {
    }
    EditprofilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditprofilePage]
        })
    ], EditprofilePageModule);
    return EditprofilePageModule;
}());
export { EditprofilePageModule };
//# sourceMappingURL=editprofile.module.js.map