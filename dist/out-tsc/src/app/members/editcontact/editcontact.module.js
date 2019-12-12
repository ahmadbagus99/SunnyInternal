import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditcontactPage } from './editcontact.page';
var routes = [
    {
        path: '',
        component: EditcontactPage
    }
];
var EditcontactPageModule = /** @class */ (function () {
    function EditcontactPageModule() {
    }
    EditcontactPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditcontactPage]
        })
    ], EditcontactPageModule);
    return EditcontactPageModule;
}());
export { EditcontactPageModule };
//# sourceMappingURL=editcontact.module.js.map