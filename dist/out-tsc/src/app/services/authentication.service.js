import * as tslib_1 from "tslib";
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { ShareService } from '../share/share';
import { Router } from '@angular/router';
//account 
var TOKEN_KEY = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(storage, plt, toastController, share, router) {
        var _this = this;
        this.storage = storage;
        this.plt = plt;
        this.toastController = toastController;
        this.share = share;
        this.router = router;
        this.authenticationState = new BehaviorSubject(false);
        this.plt.ready().then(function () {
            _this.checkToken();
        });
    }
    AuthenticationService.prototype.checkToken = function () {
        var _this = this;
        this.storage.get(TOKEN_KEY).then(function (res) {
            if (res) {
                _this.authenticationState.next(true);
            }
        });
    };
    AuthenticationService.prototype.login = function () {
        var _this = this;
        return this.storage.set(TOKEN_KEY, this.userName).then(function () {
            _this.router.navigate(['members/dashboard']);
            _this.authenticationState.next(true);
        });
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        return this.storage.remove(TOKEN_KEY).then(function () {
            _this.storage.remove('IdLogin');
            _this.storage.remove('session_storage');
            _this.authenticationState.next(false);
        });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.showToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: msg,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            Platform,
            ToastController,
            ShareService,
            Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map