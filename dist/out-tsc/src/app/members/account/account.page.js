import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from "src/app/services/data.service";
var AccountPage = /** @class */ (function () {
    function AccountPage(router, postPvdr, storage, alertController, loadingController, dataService) {
        var _this = this;
        this.router = router;
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.alertController = alertController;
        this.loadingController = loadingController;
        this.dataService = dataService;
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
    AccountPage.prototype.ngOnInit = function () {
        this.setFilteredItems();
    };
    AccountPage.prototype.addcontact = function () {
        this.router.navigate(['members/addaccount']);
    };
    AccountPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.itemsNew = [];
        this.loadAcount();
        this.loadAcountNew();
    };
    AccountPage.prototype.updateAccount = function (id, nama, web, phone, email, owner, type, event_date, category, industry, employee) {
        this.router.navigate(['members/addaccount/' + id + '/' + nama + '/' + web + '/' + phone + '/' + email + '/' + owner + '/' + type + '/' + event_date + '/' + category + '/' + industry + '/' + employee]);
    };
    AccountPage.prototype.deleteAccount = function (id) {
        var _this = this;
        var body = {
            aksi: 'delete',
            id: id,
        };
        this.postPvdr.postData(body, 'InsertAccount.php').subscribe(function (data) {
            _this.ionViewWillEnter();
        });
    };
    AccountPage.prototype.loadAcount = function () {
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
    AccountPage.prototype.loadAcountNew = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadAccountNew.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.itemsNew.push(item);
                }
            });
        });
    };
    AccountPage.prototype.presentAlertMultipleButtons = function (id) {
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
                                        _this.postPvdr.postData(body, 'InsertAccount.php').subscribe(function (data) {
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
    AccountPage.prototype.arrayOne = function (n) {
        return Array(n);
    };
    AccountPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 500);
    };
    AccountPage.prototype.setFilteredItems = function () {
        this.items = this.dataService.filterAccount(this.searchTerm);
    };
    AccountPage = tslib_1.__decorate([
        Component({
            selector: 'app-account',
            templateUrl: './account.page.html',
            styleUrls: ['./account.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PostProvider,
            Storage,
            AlertController,
            LoadingController,
            DataService])
    ], AccountPage);
    return AccountPage;
}());
export { AccountPage };
//# sourceMappingURL=account.page.js.map