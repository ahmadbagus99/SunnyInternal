import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PostProvider } from 'src/providers/post-providers';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
//images
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
var EditproductPage = /** @class */ (function () {
    function EditproductPage(storageLocal, postPvdr, router, actRoute, loadingController, storage, database) {
        var _this = this;
        this.storageLocal = storageLocal;
        this.postPvdr = postPvdr;
        this.router = router;
        this.actRoute = actRoute;
        this.loadingController = loadingController;
        this.storage = storage;
        this.database = database;
        //File details  
        this.fileName = '';
        this.userIDDesc = 'product';
        this.userID = "";
        this.namaProduk = "";
        this.tipeProduk = "";
        this.statusProduk = "";
        this.jumlahProduk = "";
        this.hargaProduk = "";
        this.deskripsiProduk = "";
        this.isUploading = false;
        this.isUploaded = false;
        //Set collection where our documents/ images info will save
        this.storageLocal.get('IdLogin').then(function (IdLogin) {
            _this.userID = IdLogin.toString();
            _this.imageCollection = database.collection(_this.userID + _this.id + _this.userIDDesc);
            _this.images = _this.imageCollection.valueChanges();
        });
        this.isImgLoaded = false;
    }
    // upload start function
    EditproductPage.prototype.uploadFile = function (event) {
        var _this = this;
        // The File object
        var file = event.item(0);
        // Validation for Images Only
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            return;
        }
        this.isUploading = true;
        this.isUploaded = false;
        this.fileName = file.name;
        // The storage path
        var path = "SunnyStorage/" + new Date().getTime() + "_" + file.name;
        // Totally optional metadata
        var customMetadata = { app: 'Sunny Images' };
        //File reference
        var fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata: customMetadata });
        // Get file progress percentage
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges().pipe(finalize(function () {
            // Get uploaded file storage path
            _this.UploadedFileURL = fileRef.getDownloadURL();
            _this.UploadedFileURL.subscribe(function (resp) {
                _this.addImagetoDB({
                    name: file.name,
                    filepath: resp,
                    size: _this.fileSize
                });
                _this.isUploading = false;
                _this.isUploaded = true;
            }, function (error) {
                console.error(error);
            });
        }), tap(function (snap) {
            _this.fileSize = snap.totalBytes;
        }));
    };
    EditproductPage.prototype.addImagetoDB = function (image) {
        var _this = this;
        //Create an ID for document
        // const id = this.database.createId();
        this.storageLocal.get('IdLogin').then(function (IdLogin) {
            _this.userID = IdLogin.toString();
            var id = _this.userID + _this.userIDDesc;
            //Set document id with value in database
            _this.imageCollection.doc(id).set(image).then(function (resp) {
                console.log(resp);
            }).catch(function (error) {
                console.log("error " + error);
            });
        });
    };
    //end function
    EditproductPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            _this.id = data.id;
            _this.namaProduk = data.namaProduk;
            _this.tipeProduk = data.tipeProduk;
            _this.statusProduk = data.statusProduk;
            _this.jumlahProduk = data.jumlahProduk;
            _this.hargaProduk = data.hargaProduk;
            _this.deskripsiProduk = data.deskripsiProduk;
            console.log(data);
        });
        this.storageLocal.get('session_storage').then(function (iduser) {
            _this.items2 = iduser;
            _this.items2 = _this.items2.map(function (user) { return user.id; });
            _this.user = parseInt(_this.items2);
            _this.userID = _this.user;
        });
    };
    EditproductPage.prototype.Simpan = function () {
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
                                    namaProduk: _this.namaProduk,
                                    tipeProduk: _this.tipeProduk,
                                    statusProduk: _this.statusProduk,
                                    jumlahProduk: _this.jumlahProduk,
                                    hargaProduk: _this.hargaProduk,
                                    deskripsiProduk: _this.deskripsiProduk,
                                    userID: _this.userID
                                };
                                _this.postPvdr.postData(body, 'InsertProduct.php').subscribe(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        loading.dismiss().then(function () {
                                            _this.router.navigate(['members/product']);
                                        });
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                }
            });
        });
    };
    EditproductPage.prototype.update = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingController.create({
                            message: 'Please Wait..',
                            translucent: true
                        })];
                    case 1:
                        loading = _a.sent();
                        loading.present();
                        return [2 /*return*/, new Promise(function (resolve) {
                                var body = {
                                    aksi: 'update',
                                    id: _this.id,
                                    namaProduk: _this.namaProduk,
                                    tipeProduk: _this.tipeProduk,
                                    statusProduk: _this.statusProduk,
                                    jumlahProduk: _this.jumlahProduk,
                                    hargaProduk: _this.hargaProduk,
                                    deskripsiProduk: _this.deskripsiProduk,
                                };
                                _this.postPvdr.postData(body, 'InsertProduct.php').subscribe(function (data) {
                                    loading.dismiss().then(function () {
                                        _this.router.navigate(['members/product']);
                                    });
                                });
                            })];
                }
            });
        });
    };
    EditproductPage = tslib_1.__decorate([
        Component({
            selector: 'app-editproduct',
            templateUrl: './editproduct.page.html',
            styleUrls: ['./editproduct.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            PostProvider,
            Router,
            ActivatedRoute,
            LoadingController,
            AngularFireStorage,
            AngularFirestore])
    ], EditproductPage);
    return EditproductPage;
}());
export { EditproductPage };
//# sourceMappingURL=editproduct.page.js.map