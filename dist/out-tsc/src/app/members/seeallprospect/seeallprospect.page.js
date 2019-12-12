import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
var SeeallprospectPage = /** @class */ (function () {
    function SeeallprospectPage(router, postPvdr, storage, alertController, loadingController, dataService, nativePageTransitions, callNumber) {
        var _this = this;
        this.router = router;
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.dataService = dataService;
        this.nativePageTransitions = nativePageTransitions;
        this.callNumber = callNumber;
        this.items = [];
        this.itemsNew = [];
        this.limit = 10;
        this.start = 0;
        this.isLoaded = false;
        this.data = [];
        this.searchTerm = "";
        this.selectCategory = 'Populer';
        setTimeout(function () {
            _this.isLoaded = true;
        }, 2000);
    }
    SeeallprospectPage.prototype.ngOnInit = function () {
    };
    SeeallprospectPage.prototype.addprospect = function () {
        var options = {
            direction: 'up',
            duration: 600
        };
        this.nativePageTransitions.curl(options);
        this.router.navigate(['members/addprospect']);
    };
    SeeallprospectPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.itemsNew = [];
        this.loadProspect();
        this.loadProspectNew();
        console.log(this.items);
    };
    SeeallprospectPage.prototype.deleteProspect = function (id) {
        var _this = this;
        var body = {
            aksi: 'delete',
            id: id,
        };
        this.postPvdr.postData(body, 'InsertProspect.php').subscribe(function (data) {
            _this.ionViewWillEnter();
        });
    };
    SeeallprospectPage.prototype.updateprospect = function (id, nama, company, no_tlpn, almt_rumah, customerneed) {
        this.router.navigate(['members/editprospect/'
                + id + '/'
                + nama + '/'
                + company + '/'
                + no_tlpn + '/'
                + almt_rumah + '/'
                + customerneed + '/'
        ]);
    };
    SeeallprospectPage.prototype.loadProspect = function () {
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
                            _this.postPvdr.postData(body, 'LoadProspect.php?Id=' + _this.user).subscribe(function (data) {
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
    SeeallprospectPage.prototype.loadProspectNew = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadProspectNew.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.itemsNew.push(item);
                }
            });
        });
    };
    SeeallprospectPage.prototype.arrayOne = function (n) {
        return Array(n);
    };
    SeeallprospectPage.prototype.presentAlertMultipleButtons = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Are you sure?',
                            subHeader: '',
                            message: '',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        var body = {
                                            aksi: 'delete',
                                            id: id,
                                        };
                                        _this.postPvdr.postData(body, 'InsertProspect.php').subscribe(function (data) {
                                            _this.ionViewWillEnter();
                                        });
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
    SeeallprospectPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 500);
    };
    SeeallprospectPage.prototype.setFilteredItems = function () {
        this.items = this.dataService.filterProduct(this.searchTerm);
    };
    SeeallprospectPage = tslib_1.__decorate([
        Component({
            selector: 'app-seeallprospect',
            templateUrl: './seeallprospect.page.html',
            styleUrls: ['./seeallprospect.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PostProvider,
            Storage,
            AlertController,
            LoadingController,
            DataService,
            NativePageTransitions,
            CallNumber])
    ], SeeallprospectPage);
    return SeeallprospectPage;
}());
export { SeeallprospectPage };
//# sourceMappingURL=seeallprospect.page.js.map