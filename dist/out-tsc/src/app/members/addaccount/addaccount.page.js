import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController } from '@ionic/angular';
var AddaccountPage = /** @class */ (function () {
    function AddaccountPage(postPvdr, router, actRoute, storage, loadingController, toastCtrl) {
        this.postPvdr = postPvdr;
        this.router = router;
        this.actRoute = actRoute;
        this.storage = storage;
        this.loadingController = loadingController;
        this.toastCtrl = toastCtrl;
        this.nama = "";
        this.web = "";
        this.phone = "";
        this.email = "";
        this.owner = "";
        this.type = "";
        this.event_date = "";
        this.category = "";
        this.industry = "";
        this.employee = "";
        this.userID = "";
    }
    AddaccountPage.prototype.AddAccount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
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
                        if (this.nama == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Nama tidak boleh kosong',
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
                        else if (this.web == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Website tidak boleh kosong',
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
                        else if (this.phone == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Nomor Telepon tidak boleh kosong',
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
                                                message: 'Email tidak boleh kosong',
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
                        else if (this.owner == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Owner harus di isi',
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
                        else if (this.type == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Type perusahaan harus di isi',
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
                        else if (this.event_date == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Event Date harus di isi',
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
                        else if (this.category == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Category harus di isi',
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
                        else if (this.industry == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Industry tidak boleh kosong',
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
                        else if (this.employee == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Silahkan isi Jumlah Employee',
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
                            return [2 /*return*/, new Promise(function (resolve) {
                                    var body = {
                                        aksi: 'add',
                                        nama: _this.nama,
                                        web: _this.web,
                                        phone: _this.phone,
                                        email: _this.email,
                                        owner: _this.owner,
                                        type: _this.type,
                                        event_date: _this.event_date,
                                        category: _this.category,
                                        industry: _this.industry,
                                        employee: _this.employee,
                                        userID: _this.userID
                                    };
                                    _this.postPvdr.postData(body, 'InsertAccount.php').subscribe(function (data) {
                                        loading.dismiss().then(function () {
                                            _this.router.navigate(['members/account']);
                                        });
                                    });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddaccountPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            if (data.id == null) {
            }
            else {
                _this.id = data.id;
                _this.nama = data.nama;
                _this.web = data.web;
                _this.phone = data.phone;
                _this.email = data.email;
                _this.owner = data.owner;
                _this.type = data.type;
                _this.event_date = data.event_date;
                _this.category = data.category;
                _this.industry = data.industry;
                _this.employee = data.employee;
                console.log(data);
            }
        });
        this.storage.get('session_storage').then(function (iduser) {
            _this.items2 = iduser;
            _this.items2 = _this.items2.map(function (user) { return user.id; });
            _this.user = parseInt(_this.items2);
            console.log(_this.items2);
            _this.userID = _this.user;
        });
    };
    AddaccountPage.prototype.updateAccount = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: "Please Wait...",
                            translucent: true
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        return [2 /*return*/, new Promise(function (resolve) {
                                var body = {
                                    aksi: 'update',
                                    id: _this.id,
                                    nama: _this.nama,
                                    web: _this.web,
                                    phone: _this.phone,
                                    email: _this.email,
                                    owner: _this.owner,
                                    type: _this.type,
                                    event_date: _this.event_date,
                                    category: _this.category,
                                    industry: _this.industry,
                                    employee: _this.employee
                                };
                                _this.postPvdr.postData(body, 'InsertAccount.php').subscribe(function (data) {
                                    loading.dismiss().then(function () {
                                        _this.router.navigate(['members/account']);
                                        console.log('Ok');
                                    });
                                });
                            })];
                }
            });
        });
    };
    AddaccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-addaccount',
            templateUrl: './addaccount.page.html',
            styleUrls: ['./addaccount.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PostProvider,
            Router,
            ActivatedRoute,
            Storage,
            LoadingController,
            ToastController])
    ], AddaccountPage);
    return AddaccountPage;
}());
export { AddaccountPage };
//# sourceMappingURL=addaccount.page.js.map