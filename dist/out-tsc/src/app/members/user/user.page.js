import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
var UserPage = /** @class */ (function () {
    function UserPage(postPvdr, storage, router, loadingController) {
        this.postPvdr = postPvdr;
        this.storage = storage;
        this.router = router;
        this.loadingController = loadingController;
        this.items = [];
        this.limit = 10;
        this.start = 0;
    }
    UserPage.prototype.ionViewWillEnter = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.items = [];
                this.start = 0;
                this.LoadUser();
                return [2 /*return*/];
            });
        });
    };
    UserPage.prototype.ngOnInit = function () {
    };
    UserPage.prototype.edit = function (id, email, password) {
        this.router.navigate(['members/edituser/' + id + '/' + email + '/' + password]);
    };
    UserPage.prototype.LoadUser = function () {
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
                            _this.postPvdr.postData(body, 'ReadUser.php?Id=' + _this.user).subscribe(function (data) {
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
    // async loading(){
    //   const loading = await this.loadingController.create({
    //     message : "Please Wait..",
    //     duration : 2000,
    //   });
    //   await loading.present();
    // }
    UserPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 500);
    };
    UserPage = tslib_1.__decorate([
        Component({
            selector: 'app-user',
            templateUrl: './user.page.html',
            styleUrls: ['./user.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [PostProvider,
            Storage,
            Router,
            LoadingController])
    ], UserPage);
    return UserPage;
}());
export { UserPage };
//# sourceMappingURL=user.page.js.map