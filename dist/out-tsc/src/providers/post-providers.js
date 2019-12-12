import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
var PostProvider = /** @class */ (function () {
    function PostProvider(http) {
        this.http = http;
        // server: string = "https://cors-anywhere.herokuapp.com/http://bpmonline.asia/CRM_Local/";
        this.server = "http://bpmonline.asia/CRM_Local/";
    }
    PostProvider.prototype.postData = function (body, file) {
        var type = 'application/json; charset=UTF-8';
        var headers = new Headers({ 'Content-type': type });
        var options = new RequestOptions({ headers: headers });
        return this.http.post(this.server + file, JSON.stringify(body), options)
            .map(function (res) { return res.json(); });
    };
    PostProvider = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [Http])
    ], PostProvider);
    return PostProvider;
}());
export { PostProvider };
//# sourceMappingURL=post-providers.js.map