import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(toastCtrl, postPvdr, router, loadingController) {
        this.toastCtrl = toastCtrl;
        this.postPvdr = postPvdr;
        this.router = router;
        this.loadingController = loadingController;
        this.nama = '';
        this.email = '';
        this.password = '';
        // tslint:disable-next-line: variable-name
        this.confirm_password = '';
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.login = function () {
        this.router.navigate(['login']);
    };
    RegisterPage.prototype.prosesregister = function () {
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
                        // tslint:disable-next-line: triple-equals
                        if (this.nama == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Nama diperlukan!',
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
                        else if (this.email == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Email diperlukan',
                                                duration: 2000
                                            })];
                                        case 1:
                                            toast = _a.sent();
                                            toast.present();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // tslint:disable-next-line: triple-equals
                        }
                        else if (this.password == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Password diperlukan!',
                                                duration: 2000
                                            })];
                                        case 1:
                                            toast = _a.sent();
                                            toast.present();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            // tslint:disable-next-line: triple-equals
                        }
                        else if (this.password != this.confirm_password) {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Password tidak sama!',
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
                        else {
                            body = {
                                nama: this.nama,
                                email: this.email,
                                password: this.password,
                                aksi: 'register'
                            };
                            this.postPvdr.postData(body, 'LoadUser.php').subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var alertmsg;
                                var _this = this;
                                return tslib_1.__generator(this, function (_a) {
                                    alertmsg = data;
                                    if (data.success) {
                                        loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var toast;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        this.router.navigate(['login']);
                                                        return [4 /*yield*/, this.toastCtrl.create({
                                                                message: 'Pendaftaran Berhasil!',
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
                                    else {
                                        loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                            var toast;
                                            return tslib_1.__generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                            message: alertmsg,
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
                                });
                            }); });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            PostProvider,
            Router,
            LoadingController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map