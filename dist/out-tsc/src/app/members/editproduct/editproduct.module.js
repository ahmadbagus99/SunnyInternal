import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { EditproductPage } from './editproduct.page';
import { FileSizeFormatPipe } from './file-size-format.pipe';
var routes = [
    {
        path: '',
        component: EditproductPage
    }
];
var EditproductPageModule = /** @class */ (function () {
    function EditproductPageModule() {
    }
    EditproductPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [EditproductPage, FileSizeFormatPipe]
        })
    ], EditproductPageModule);
    return EditproductPageModule;
}());
export { EditproductPageModule };
//# sourceMappingURL=editproduct.module.js.map