import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
var AddcontactPage = /** @class */ (function () {
    function AddcontactPage(postPvdr, router, actRoute, storage, loadingController, toastCtrl) {
        this.postPvdr = postPvdr;
        this.router = router;
        this.actRoute = actRoute;
        this.storage = storage;
        this.loadingController = loadingController;
        this.toastCtrl = toastCtrl;
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
        this.limit = 10;
        this.start = 0;
    }
    AddcontactPage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.loadAcount();
    };
    AddcontactPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            if (data.id == null) {
            }
            else {
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
    AddcontactPage.prototype.route = function () {
    };
    AddcontactPage.prototype.createdProcess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
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
                        else if (this.alamat == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Alamat tidak boleh kosong',
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
                        else if (this.tgl_lahir == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Tanggal Lahir tidak boleh kosong',
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
                        else if (this.kelamin == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Kelamin tidak boleh kosong',
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
                        else if (this.no_tlp == '') {
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
                        else if (this.almt_rumah == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Alamat Rumah tidak boleh kosong',
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
                        else if (this.title == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Title tidak boleh kosong',
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
                        else if (this.perusahaan == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Perusahaan tidak boleh kosong',
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
                        else if (this.almt_perusahaan == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Alamat Perusahaan tidak boleh kosong',
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
                        else if (this.penghasilan == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Penghasilan tidak boleh kosong',
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
                        else if (this.Hobi == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Hobi tidak boleh kosong',
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
                        else if (this.Makanan_Favorit == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Makanan Favorit tidak boleh kosong',
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
                        else if (this.NPWP == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'NPWP harus diisi!',
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
                        else if (this.Facebook == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Facebook tidak boleh kosong',
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
                        else if (this.Twitter == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Twitter tidak boleh kosong',
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
                        else if (this.Instagram == '') {
                            loading.dismiss().then(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.toastCtrl.create({
                                                message: 'Instagram tidak boleh kosong',
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
                                        alamat: _this.alamat,
                                        tgl_lahir: _this.tgl_lahir,
                                        kelamin: _this.kelamin,
                                        no_tlp: _this.no_tlp,
                                        almt_rumah: _this.almt_rumah,
                                        title: _this.title,
                                        perusahaan: _this.perusahaan,
                                        almt_perusahaan: _this.almt_perusahaan,
                                        penghasilan: _this.penghasilan,
                                        Hobi: _this.Hobi,
                                        Makanan_Favorit: _this.Makanan_Favorit,
                                        NPWP: _this.NPWP,
                                        Facebook: _this.Facebook,
                                        Twitter: _this.Twitter,
                                        Instagram: _this.Instagram,
                                        userID: _this.userID
                                    };
                                    _this.postPvdr.postData(body, 'InsertContact.php').subscribe(function (data) {
                                        loading.dismiss().then(function () {
                                            _this.router.navigate(['members/contact']);
                                        });
                                    });
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddcontactPage.prototype.updateProcess = function () {
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
                                    alamat: _this.alamat,
                                    tgl_lahir: _this.tgl_lahir,
                                    kelamin: _this.kelamin,
                                    no_tlp: _this.no_tlp,
                                    almt_rumah: _this.almt_rumah,
                                    title: _this.title,
                                    perusahaan: _this.perusahaan,
                                    category: _this.category,
                                    almt_perusahaan: _this.almt_perusahaan,
                                    penghasilan: _this.penghasilan,
                                    Hobi: _this.Hobi,
                                    Makanan_Favorit: _this.Makanan_Favorit,
                                    NPWP: _this.NPWP,
                                    Facebook: _this.Facebook,
                                    Twitter: _this.Twitter,
                                    Instagram: _this.Instagram
                                };
                                _this.postPvdr.postData(body, 'InsertContact.php').subscribe(function (data) {
                                    loading.dismiss().then(function () {
                                        _this.router.navigate(['members/contact']);
                                    });
                                });
                            })];
                }
            });
        });
    };
    AddcontactPage.prototype.next = function () {
        this.slides.slideNext();
    };
    AddcontactPage.prototype.prev = function () {
        this.slides.slidePrev();
    };
    AddcontactPage.prototype.loadAcount = function () {
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
    ], AddcontactPage.prototype, "slides", void 0);
    AddcontactPage = tslib_1.__decorate([
        Component({
            selector: 'app-addcontact',
            templateUrl: './addcontact.page.html',
            styleUrls: ['./addcontact.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PostProvider,
            Router,
            ActivatedRoute,
            Storage,
            LoadingController,
            ToastController])
    ], AddcontactPage);
    return AddcontactPage;
}());
export { AddcontactPage };
//# sourceMappingURL=addcontact.page.js.map