import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';
var EditcontactPage = /** @class */ (function () {
    function EditcontactPage(router, postPvdr, storage, alertController, actRoute, loadingController, callNumber) {
        this.router = router;
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.alertController = alertController;
        this.actRoute = actRoute;
        this.loadingController = loadingController;
        this.callNumber = callNumber;
        this.nama = "";
        this.alamat = "";
        this.tgl_lahir = "";
        this.kelamin = "";
        this.no_tlp = "";
        this.almt_rumah = "";
        this.title = "";
        this.perusahaan = "";
        this.almt_perusahaan = "";
        this.Hobi = "";
        this.Makanan_Favorit = "";
        this.Facebook = "";
        this.Twitter = "";
        this.Instagram = "";
        this.NPWP = "";
        this.userID = "";
        this.penghasilan = "";
        this.items = [];
        this.itemsNew = [];
        this.limit = 10;
        this.start = 0;
    }
    EditcontactPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.itemsNew = [];
        this.loadContact();
    };
    EditcontactPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            _this.id = data.id;
            _this.nama = data.nama;
            _this.alamat = data.alamat;
            _this.tgl_lahir = data.tgl_lahir;
            _this.kelamin = data.kelamin;
            _this.no_tlp = data.no_tlp;
            _this.almt_rumah = data.almt_rumah;
            _this.title = data.title;
            _this.category = data.category;
            _this.penghasilan = data.penghasilan;
            _this.perusahaan = data.perusahaan;
            _this.almt_perusahaan = data.almt_perusahaan;
            _this.penghasilan = data.penghasilan,
                _this.Hobi = data.Hobi,
                _this.Makanan_Favorit = data.Makanan_Favorit,
                _this.NPWP = data.NPWP,
                _this.Facebook = data.Facebook,
                _this.Twitter = data.Twitter,
                _this.Instagram = data.Instagram;
            _this.nomor = data.no_tlp;
        });
    };
    EditcontactPage.prototype.updatecontact = function (id, nama, alamat, tgl_lahir, kelamin, no_tlp, almt_rumah, title, perusahaan, almt_perusahaan, penghasilan, Hobi, Makanan_Favorit, NPWP, Facebook, Twitter, Instagram) {
        this.router.navigate(['members/addcontact/'
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
    EditcontactPage.prototype.loadContact = function () {
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
    EditcontactPage.prototype.call = function (data) {
        var num = this.nomor;
        console.log('Memanggil..', num);
        this.callNumber.callNumber(num, true)
            .then(function (res) { return console.log("Launched Dialer!", res); })
            .catch(function (err) { return console.log("Dialer Error", err); });
    };
    EditcontactPage = tslib_1.__decorate([
        Component({
            selector: 'app-editcontact',
            templateUrl: './editcontact.page.html',
            styleUrls: ['./editcontact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PostProvider,
            Storage,
            AlertController,
            ActivatedRoute,
            LoadingController,
            CallNumber])
    ], EditcontactPage);
    return EditcontactPage;
}());
export { EditcontactPage };
//# sourceMappingURL=editcontact.page.js.map