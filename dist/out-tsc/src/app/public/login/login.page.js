import * as tslib_1 from "tslib";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Component } from '@angular/core';
import { ShareService } from 'src/app/share/share';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';
var TOKEN_KEY = 'auth-token';
var LoginPage = /** @class */ (function () {
    function LoginPage(storage, authService, toastCtrl, share, postPvdr, alertController, loadingController) {
        this.storage = storage;
        this.authService = authService;
        this.toastCtrl = toastCtrl;
        this.share = share;
        this.postPvdr = postPvdr;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.items = [];
        this.limit = 10;
        this.start = 0;
    }
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, body;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: "",
                            spinner: 'crescent',
                            translucent: true,
                            cssClass: 'custom-loader-class',
                            mode: 'md'
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        if (this.email != '' && this.password != '') {
                            body = {
                                email: this.email,
                                password: this.password,
                                aksi: 'login'
                            };
                            this.postPvdr.postData(body, 'LoadUser.php').subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var alertmsg;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    alertmsg = data.msg;
                                    if (data.success) {
                                        this.storage.set('session_storage', data.result);
                                        this.storage.set(TOKEN_KEY, this.newMethod().email).then(function () {
                                            _this.authService.authenticationState.next(true);
                                        });
                                        loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var _this = this;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.alertController.create({
                                                            message: 'Login Berhasil',
                                                        }).then(function (overlay) {
                                                            _this.alert = overlay;
                                                            _this.alert.present();
                                                            setTimeout(function () {
                                                                _this.alert.dismiss();
                                                            }, 1000);
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    else {
                                        loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var _this = this;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.alertController.create({
                                                            subHeader: alertmsg,
                                                            buttons: ['OK']
                                                        }).then(function (overlay) {
                                                            _this.alert = overlay;
                                                            _this.alert.present();
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); });
                                    }
                                    return [2 /*return*/];
                                });
                            }); });
                        }
                        else {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Email dan Password Salah',
                                                duration: 2000
                                            })];
                                        case 1:
                                            toast = _a.sent();
                                            toast.present();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.newMethod = function () {
        return this;
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            AuthenticationService,
            ToastController,
            ShareService,
            PostProvider,
            AlertController,
            LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map