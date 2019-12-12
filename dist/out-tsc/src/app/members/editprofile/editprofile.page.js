import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from 'src/app/share/share';
import { LoadingController } from '@ionic/angular';
var EditprofilePage = /** @class */ (function () {
    function EditprofilePage(postPvdr, storage, actRoute, router, share, loadingController) {
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.actRoute = actRoute;
        this.router = router;
        this.share = share;
        this.loadingController = loadingController;
        this.fullname = "";
        this.phonenumber = "";
        this.birthday = "";
        this.email = "";
        this.country = "";
        this.userID = "";
    }
    EditprofilePage.prototype.updateProcess = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading, body;
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
                        body = {
                            aksi: 'update',
                            id: this.id,
                            fullname: this.fullname,
                            phonenumber: this.phonenumber,
                            birthday: this.birthday,
                            email: this.email,
                            country: this.country
                        };
                        this.postPvdr.postData(body, 'InsertProfile.php').subscribe(function (data) {
                            loading.dismiss().then(function () {
                                _this.router.navigate(['members/profile']);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    EditprofilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            _this.id = data.id;
            _this.fullname = data.fullname;
            _this.phonenumber = data.phonenumber;
            _this.birthday = data.birthday;
            _this.email = data.email;
            _this.country = data.country;
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
    EditprofilePage.prototype.createdProcess = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var body = {
                aksi: 'add',
                fullname: _this.fullname,
                phonenumber: _this.phonenumber,
                birthday: _this.birthday,
                email: _this.email,
                country: _this.country,
                userID: _this.userID
            };
            _this.postPvdr.postData(body, 'InsertProfile.php').subscribe(function (data) {
                console.log('Ok');
            });
        });
    };
    EditprofilePage = tslib_1.__decorate([
        Component({
            selector: 'app-editprofile',
            templateUrl: './editprofile.page.html',
            styleUrls: ['./editprofile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PostProvider,
            Storage,
            ActivatedRoute,
            Router,
            ShareService,
            LoadingController])
    ], EditprofilePage);
    return EditprofilePage;
}());
export { EditprofilePage };
//# sourceMappingURL=editprofile.page.js.map