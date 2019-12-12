import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ShareService } from 'src/app/share/share';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';
var TOKEN_data = 'data';
var TOKEN_dataacc = 'dataacc';
var DataService = /** @class */ (function () {
    function DataService(storage, share, postPvdr) {
        this.storage = storage;
        this.share = share;
        this.postPvdr = postPvdr;
        this.itemsContact = [];
        this.itemsAccount = [];
        this.itemsProduct = [];
        this.start = 0;
        this.limit = 10;
        this.loadContact();
        this.loadAcount();
        this.loadProduct();
    }
    DataService.prototype.loadContact = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadContact.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.itemsContact.push(item);
                }
            });
        });
    };
    DataService.prototype.loadAcount = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadAccount.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                    var item = data_2[_i];
                    _this.itemsAccount.push(item);
                }
            });
        });
    };
    DataService.prototype.loadProduct = function () {
        var _this = this;
        this.storage.get('IdLogin').then(function (IdLogin) {
            _this.user = IdLogin;
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadProduct.php?Id=' + _this.user).subscribe(function (data) {
                for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                    var item = data_3[_i];
                    _this.itemsProduct.push(item);
                }
            });
        });
    };
    DataService.prototype.filterContact = function (searchTerm) {
        return this.itemsContact.filter(function (item) {
            return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    DataService.prototype.filterAccount = function (searchTerm) {
        return this.itemsAccount.filter(function (item) {
            return item.nama.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    DataService.prototype.filterProduct = function (searchTerm) {
        return this.itemsProduct.filter(function (item) {
            return item.namaProduk.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    };
    DataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            ShareService,
            PostProvider])
    ], DataService);
    return DataService;
}());
export { DataService };
//# sourceMappingURL=data.service.js.map