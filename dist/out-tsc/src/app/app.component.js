import * as tslib_1 from "tslib";
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs/observable/timer';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, authenticationService, router) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authenticationService = authenticationService;
        this.router = router;
        this.showSplash = true;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            timer(3000).subscribe(function () { return _this.showSplash = false; });
            _this.authenticationService.authenticationState.subscribe(function (state) {
                if (state) {
                    // this.router.navigate(['members', 'dashboard']);
                    _this.router.navigate(['members/dashboard']);
                }
                else {
                    _this.router.navigate(['']);
                }
            });
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthenticationService,
            Router])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map