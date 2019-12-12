import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
//upload
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { finalize, tap } from 'rxjs/operators';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(router, postPvdr, storageLocal, loadingController, storage, database) {
        var _this = this;
        this.router = router;
        this.postPvdr = postPvdr;
        this.storageLocal = storageLocal;
        this.loadingController = loadingController;
        this.storage = storage;
        this.database = database;
        //File details  
        this.fileName = '';
        this.userIDDesc = 'profile';
        this.items = [];
        this.limit = 10;
        this.start = 0;
        this.file = File;
        this.profile = [];
        this.isUploading = false;
        this.isUploaded = false;
        //Set collection where our documents/ images info will save
        this.storageLocal.get('IdLogin').then(function (IdLogin) {
            _this.userID = IdLogin.toString();
            _this.imageCollection = database.collection(_this.userID + _this.userIDDesc);
            _this.images = _this.imageCollection.valueChanges();
        });
    }
    // upload start function
    ProfilePage.prototype.uploadFile = function (event) {
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
    ProfilePage.prototype.addImagetoDB = function (image) {
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
    ProfilePage.prototype.editprofile = function () {
        this.router.navigate(['members/editprofile']);
    };
    ProfilePage.prototype.ngOnInit = function () {
    };
    ProfilePage.prototype.EditProfile = function (id, fullname, phonenumber, birthday, email, country) {
        this.router.navigate(['members/editprofile/' + id + '/' + fullname + '/' + phonenumber + '/' + birthday + '/' + email + '/' + country]);
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        this.items = [];
        this.start = 0;
        this.LoadProfile();
    };
    ProfilePage.prototype.LoadProfile = function () {
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
                        this.storageLocal.get('IdLogin').then(function (IdLogin) {
                            _this.user = IdLogin;
                            var body = {
                                aksi: 'getdata',
                                limit: _this.limit,
                                start: _this.start,
                            };
                            _this.postPvdr.postData(body, 'LoadProfile.php?Id=' + _this.user).subscribe(function (data) {
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
    ProfilePage.prototype.changeListener = function ($event) {
        this.file = $event.target.files[0];
        console.log(this.file);
        this.storageLocal.set('images', this.file);
    };
    ProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-profile',
            templateUrl: './profile.page.html',
            styleUrls: ['./profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            PostProvider,
            Storage,
            LoadingController,
            AngularFireStorage,
            AngularFirestore])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.page.js.map