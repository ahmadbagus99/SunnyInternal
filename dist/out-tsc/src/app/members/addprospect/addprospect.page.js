import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
var AddprospectPage = /** @class */ (function () {
    function AddprospectPage(postPvdr, router, actRoute, storage, loadingController) {
        this.postPvdr = postPvdr;
        this.router = router;
        this.actRoute = actRoute;
        this.storage = storage;
        this.loadingController = loadingController;
        this.nama = "";
        this.company = "";
        this.no_tlp = "";
        this.almt_rumah = "";
        this.customerneed = "";
        this.userID = "";
        this.items = [];
        this.limit = 10;
        this.start = 0;
    }
    AddprospectPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.loadAcount();
    };
    AddprospectPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            _this.id = data.id;
            _this.nama = data.nama;
            _this.company = data.company;
            _this.no_tlp = data.no_tlp;
            _this.almt_rumah = data.almt_rumah;
            _this.customerneed = data.customerneed;
            console.log(data);
        });
        this.storage.get('session_storage').then(function (iduser) {
            _this.items2 = iduser;
            _this.items2 = _this.items2.map(function (user) { return user.id; });
            _this.user = parseInt(_this.items2);
            console.log(_this.items2);
            _this.userID = _this.user;
        });
    };
    AddprospectPage.prototype.route = function () {
    };
    AddprospectPage.prototype.createdProcess = function () {
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
                        return [2 /*return*/, new Promise(function (resolve) {
                                var body = {
                                    aksi: 'add',
                                    nama: _this.nama,
                                    company: _this.company,
                                    no_tlp: _this.no_tlp,
                                    almt_rumah: _this.almt_rumah,
                                    customerneed: _this.customerneed,
                                    userID: _this.userID
                                };
                                _this.postPvdr.postData(body, 'InsertProspect.php').subscribe(function (data) {
                                    console.log(data);
                                    loading.dismiss().then(function () {
                                        _this.router.navigate(['members/seeallprospect']);
                                    });
                                });
                            })];
                }
            });
        });
    };
    AddprospectPage.prototype.updateProcess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: "Sedang Memproses",
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
                                    company: _this.company,
                                    no_tlp: _this.no_tlp,
                                    almt_rumah: _this.almt_rumah,
                                    customerneed: _this.customerneed,
                                };
                                _this.postPvdr.postData(body, 'InsertProspect.php').subscribe(function (data) {
                                    loading.dismiss().then(function () {
                                        _this.router.navigate(['members/seeallprospect']);
                                    });
                                });
                            })];
                }
            });
        });
    };
    AddprospectPage.prototype.next = function () {
        this.slides.slideNext();
    };
    AddprospectPage.prototype.prev = function () {
        this.slides.slidePrev();
    };
    AddprospectPage.prototype.loadAcount = function () {
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
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.storage.get('IdLogin').then(function (IdLogin) {
                            _this.user = IdLogin;
                            var body = {
                                aksi: 'getdata',
                                limit: _this.limit,
                                start: _this.start,
                            };
                            _this.postPvdr.postData(body, 'LoadAccount.php?Id=' + _this.user).subscribe(function (data) {
                                loading.dismiss().then(function () {
                                    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                                        var item = data_1[_i];
                                        _this.items.push(item);
                                    }
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    tslib_1.__decorate([
        ViewChild(IonSlides),
        tslib_1.__metadata("design:type", IonSlides)
    ], AddprospectPage.prototype, "slides", void 0);
    AddprospectPage = tslib_1.__decorate([
        Component({
            selector: 'app-addprospect',
            templateUrl: './addprospect.page.html',
            styleUrls: ['./addprospect.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PostProvider,
            Router,
            ActivatedRoute,
            Storage,
            LoadingController])
    ], AddprospectPage);
    return AddprospectPage;
}());
export { AddprospectPage };
//# sourceMappingURL=addprospect.page.js.map