import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Http, Headers, RequestMethod, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
var ShareService = /** @class */ (function () {
    function ShareService(http, postPvdr, storage) {
        this.http = http;
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.items = [];
        this.limit = 10;
        this.start = 0;
        this.url = "http://localhost:55614/api/APIDemo/";
        this.url2 = "http://localhost:55614/api/Contact/";
        this.url3 = "http://bpmonline.asia/CRM_Local/LoadUser.php";
    }
    ShareService.prototype.login = function (user, password) {
        var _url = "http://bpmonline.asia/CRM_Local/LoadUser.php";
        var _body = { "email": user, "password": password };
        var _header = new Headers({ 'Content-Type': 'Application/json' });
        var _option = new RequestOptions({ method: RequestMethod.Post, headers: _header });
        return this.http.post(_url, _body, _option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.getAllUser = function () {
        return this.http.get(this.url3).map(function (res) { return res.json(); });
    };
    ShareService.prototype.getAll = function () {
        return this.http.get(this.url).map(function (res) { return res.json(); });
    };
    // Contact
    ShareService.prototype.getAllContact = function () {
        return this.http.get(this.url2).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Create = function (web, phone, email, owner, type, npwp, category, industry, employee, idacc) {
        var body = {
            "web": web,
            "phone": phone,
            "email": email,
            "owner": owner,
            "type": type,
            "npwp": npwp,
            "category": category,
            "industry": industry,
            "employee": employee,
            "idacc": idacc
        };
        var header = new Headers({ 'Content-Type': 'application/json' });
        var option = new RequestOptions({ method: RequestMethod.Post, headers: header });
        return this.http.post(this.url, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Update = function (id, web, phone, email, owner, type, npwp, category, industry, employee, idacc) {
        var body = {
            "id": id,
            "web": web,
            "phone": phone,
            "email": email,
            "owner": owner,
            "type": type,
            "npwp": npwp,
            "category": category,
            "industry": industry,
            "employee": employee,
            "idacc": idacc
        };
        var header = new Headers({ 'Content-Type': 'application/json' });
        var option = new RequestOptions({ method: RequestMethod.Post, headers: header });
        return this.http.post(this.url, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Read = function (id) {
        return this.http.get(this.url + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.Delete = function (id) {
        return this.http.delete(this.url + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.CreateContact = function (name, number, email, userID, address) {
        var body = {
            "name": name,
            "number": number,
            "email": email,
            "userID": userID,
            "address": address
        };
        var header = new Headers({ 'Content-Type': 'application/json' });
        var option = new RequestOptions({ method: RequestMethod.Post, headers: header });
        return this.http.post(this.url2, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.UpdateContact = function (id, name, number, email, userID, address) {
        var body = {
            "id": id,
            "name": name,
            "number": number,
            "email": email,
            "userID": userID,
            "address": address
        };
        var header = new Headers({ 'Content-Type': 'application/json' });
        var option = new RequestOptions({ method: RequestMethod.Post, headers: header });
        return this.http.post(this.url2, body, option).map(function (res) { return res.json(); });
    };
    ShareService.prototype.ReadContact = function (id) {
        return this.http.get(this.url2 + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.DeleteContact = function (id) {
        return this.http.delete(this.url2 + id).map(function (res) { return res.json(); });
    };
    ShareService.prototype.loadProfil = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var body = {
                aksi: 'getdata',
                limit: _this.limit,
                start: _this.start,
            };
            _this.postPvdr.postData(body, 'LoadProfile.php?Id=' + _this.user).subscribe(function (data) {
                _this.storage.set('profile', data);
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var item = data_1[_i];
                    _this.items.push(item);
                }
                resolve(true);
            });
        });
    };
    ShareService.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.loadProfil();
    };
    ShareService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http,
            PostProvider,
            Storage])
    ], ShareService);
    return ShareService;
}());
export { ShareService };
//# sourceMappingURL=share.js.map