import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage() {
    }
    NotificationsPage.prototype.doRefresh = function (event) {
        console.log('Begin async operation');
        setTimeout(function () {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    };
    NotificationsPage.prototype.ngOnInit = function () {
    };
    NotificationsPage.prototype.deleteNotifications = function (id) {
        var body = {
            aksi: 'delete',
        };
    };
    NotificationsPage = tslib_1.__decorate([
        Component({
            selector: 'app-notifications',
            templateUrl: './notifications.page.html',
            styleUrls: ['./notifications.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], NotificationsPage);
    return NotificationsPage;
}());
export { NotificationsPage };
//# sourceMappingURL=notifications.page.js.map