import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var LoadingPage = /** @class */ (function () {
    function LoadingPage(router) {
        this.router = router;
    }
    LoadingPage.prototype.ngOnInit = function () {
    };
    LoadingPage.prototype.goToRegister = function () {
        this.router.navigate(['/register']);
    };
    LoadingPage.prototype.login = function () {
        this.router.navigate(['/login']);
    };
    LoadingPage = tslib_1.__decorate([
        Component({
            selector: 'app-loading',
            templateUrl: './loading.page.html',
            styleUrls: ['./loading.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], LoadingPage);
    return LoadingPage;
}());
export { LoadingPage };
//# sourceMappingURL=loading.page.js.map