import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
var AboutPage = /** @class */ (function () {
    function AboutPage(router) {
        this.router = router;
    }
    AboutPage.prototype.ngOnInit = function () {
    };
    AboutPage.prototype.faq = function () {
        this.router.navigate(['members/faq']);
    };
    AboutPage.prototype.syaratketentuan = function () {
        this.router.navigate(['members/syaratketentuan']);
    };
    AboutPage.prototype.pusatBantuan = function () {
        this.router.navigate(['members/pusatbantuan']);
    };
    AboutPage.prototype.kebijakanPrivasi = function () {
        this.router.navigate(['members/kebijakanprivasi']);
    };
    AboutPage.prototype.hubungiKami = function () {
        this.router.navigate(['members/hubungikami']);
    };
    AboutPage = tslib_1.__decorate([
        Component({
            selector: 'app-about',
            templateUrl: './about.page.html',
            styleUrls: ['./about.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router])
    ], AboutPage);
    return AboutPage;
}());
export { AboutPage };
//# sourceMappingURL=about.page.js.map