import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
var ContactPage = /** @class */ (function () {
    function ContactPage(router, postPvdr, storage, alertController, loadingController, dataService, nativePageTransitions, callNumber) {
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
    ContactPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
    };
    ContactPage.prototype.addcontact = function () {
        var options = {
            direction: 'up',
            duration: 600
        };
        this.nativePageTransitions.curl(options);
        this.router.navigate(['members/addcontact']);
    };
    ContactPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.itemsNew = [];
        this.loadContact();
        this.loadContactNew();
    };
    ContactPage.prototype.deleteContact = function (id) {
        var _this = this;
        var body = {
            aksi: 'delete',
            id: id,
        };
        this.postPvdr.postData(body, 'InsertContact.php').subscribe(function (data) {
            _this.ionViewWillEnter();
        });
    };
    ContactPage.prototype.updatecontact = function (id, nama, alamat, tgl_lahir, kelamin, no_tlp, almt_rumah, title, perusahaan, almt_perusahaan, penghasilan, Hobi, Makanan_Favorit, NPWP, Facebook, Twitter, Instagram) {
        this.router.navigate(['members/editcontact/'
                + id + '/'
                + nama + '/'
                + alamat + '/'
                + tgl_lahir + '/'
                + kelamin + '/'
                + no_tlp + '/'
                + almt_rumah + '/'
                + title + '/'
                + perusahaan + '/'
                + almt_perusahaan + '/'
                + penghasilan + '/'
                + Hobi + '/'
                + Makanan_Favorit + '/'
                + NPWP + '/'
                + Facebook + '/'
                + Twitter + '/'
                + Instagram]);
    };
    ContactPage.prototype.loadContact = function () {
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
                            _this.postPvdr.postData(body, 'LoadContact.php?Id=' + _this.user).subscribe(function (data) {
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
    ContactPage.prototype.loadContactNew = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadContactNew.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.itemsNew.push(item);
                }
            });
        });
    };
    ContactPage.prototype.arrayOne = function (n) {
        return Array(n);
    };
    ContactPage.prototype.presentAlertMultipleButtons = function (id) {
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
                                        _this.postPvdr.postData(body, 'InsertContact.php').subscribe(function (data) {
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
    ContactPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 500);
    };
    ContactPage.prototype.setFilteredItems = function () {
        this.items = this.dataService.filterContact(this.searchTerm);
    };
    ContactPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact',
            templateUrl: './contact.page.html',
            styleUrls: ['./contact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PostProvider,
            Storage,
            AlertController,
            LoadingController,
            DataService,
            NativePageTransitions,
            CallNumber])
    ], ContactPage);
    return ContactPage;
}());
export { ContactPage };
//# sourceMappingURL=contact.page.js.map