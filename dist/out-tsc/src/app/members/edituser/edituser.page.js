import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostProvider } from 'src/providers/post-providers';
var EdituserPage = /** @class */ (function () {
    function EdituserPage(actRoute, router, postPvdr) {
        this.actRoute = actRoute;
        this.router = router;
        this.postPvdr = postPvdr;
    }
    EdituserPage.prototype.profile = function () {
        this.router.navigate[('members/profile')];
    };
    EdituserPage.prototype.ngOnInit = function () {
        var _this = this;
        this.actRoute.params.subscribe(function (data) {
            _this.id = data.id;
            _this.email = data.email;
            _this.password = data.password;
            console.log(data);
        });
    };
    EdituserPage.prototype.updateProcess = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var body = {
                aksi: 'update',
                id: _this.id,
                email: _this.email,
                password: _this.password
            };
            _this.postPvdr.postData(body, 'LoadUser.php').subscribe(function (data) {
                console.log('Ok');
            });
        });
    };
    EdituserPage = tslib_1.__decorate([
        Component({
            selector: 'app-edituser',
            templateUrl: './edituser.page.html',
            styleUrls: ['./edituser.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            Router,
            PostProvider])
    ], EdituserPage);
    return EdituserPage;
}());
export { EdituserPage };
//# sourceMappingURL=edituser.page.js.map