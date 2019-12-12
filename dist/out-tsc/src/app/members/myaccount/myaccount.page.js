import * as tslib_1 from "tslib";
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
var MyaccountPage = /** @class */ (function () {
    function MyaccountPage(authService, alertController, router) {
        this.authService = authService;
        this.alertController = alertController;
        this.router = router;
    }
    MyaccountPage.prototype.presentAlertMultipleButtons = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Apa kamu yakin?',
                            subHeader: '',
                            message: '',
                            buttons: [
                                {
                                    text: 'Batal',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ya',
                                    handler: function () {
                                        _this.authService.logout();
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyaccountPage.prototype.ngOnInit = function () {
    };
    MyaccountPage.prototype.logout = function () {
        this.authService.logout();
    };
    MyaccountPage.prototype.profile = function () {
        this.router.navigate(['members/user']);
    };
    MyaccountPage.prototype.showDetail = function () {
        this.router.navigate(['members/about']);
    };
    MyaccountPage.prototype.bahasa = function () {
        this.router.navigate(['members/language']);
    };
    MyaccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-myaccount',
            templateUrl: './myaccount.page.html',
            styleUrls: ['./myaccount.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService,
            AlertController,
            Router])
    ], MyaccountPage);
    return MyaccountPage;
}());
export { MyaccountPage };
//# sourceMappingURL=myaccount.page.js.map