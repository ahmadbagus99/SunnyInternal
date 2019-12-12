import * as tslib_1 from "tslib";
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { Component, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
var AddactivitiesPage = /** @class */ (function () {
    function AddactivitiesPage(router, alertCtrl, locale, storage) {
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.locale = locale;
        this.storage = storage;
        this.event = {
            title: '',
            desc: '',
            startTime: '',
            endTime: '',
            allDay: false
        };
        this.minDate = new Date().toISOString();
        this.Data = [];
        this.eventSource = [];
        this.calendar = {
            mode: 'month',
            currentDate: new Date(),
        };
    }
    AddactivitiesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.resetEvent();
        this.storage.get('Activity').then(function (item) {
            _this.eventSource = item;
            if (_this.eventSource == null) {
                _this.eventSource = [];
                console.log(_this.eventSource);
            }
            else {
                _this.eventSource = item;
                console.log(_this.eventSource);
            }
        });
    };
    AddactivitiesPage.prototype.addactivities = function () {
        this.router.navigate(['members/addactivities']);
    };
    AddactivitiesPage.prototype.resetEvent = function () {
        this.event = {
            title: '',
            desc: '',
            startTime: new Date().toISOString(),
            endTime: new Date().toISOString(),
            allDay: false
        };
    };
    // Create the right event format and reload source
    AddactivitiesPage.prototype.addEvent = function () {
        var eventCopy = {
            title: this.event.title,
            startTime: new Date(this.event.startTime),
            endTime: new Date(this.event.endTime),
            allDay: this.event.allDay,
            desc: this.event.desc
        };
        if (eventCopy.allDay) {
            var start = eventCopy.startTime;
            var end = eventCopy.endTime;
            eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
            eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }
        this.eventSource.push(eventCopy);
        this.resetEvent();
        this.storage.set('Activity', this.eventSource);
        console.log('sukses menyimpan ');
        this.router.navigate(['members/activities']);
    };
    AddactivitiesPage.prototype.next = function () {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slideNext();
    };
    AddactivitiesPage.prototype.back = function () {
        var swiper = document.querySelector('.swiper-container')['swiper'];
        swiper.slidePrev();
    };
    // Change between month/week/day
    AddactivitiesPage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    // Focus today
    AddactivitiesPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    // Selected date reange and hence title changed
    AddactivitiesPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    // Calendar event was clicked
    AddactivitiesPage.prototype.onEventSelected = function (event) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var start, end, alert;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = formatDate(event.startTime, 'medium', this.locale);
                        end = formatDate(event.endTime, 'medium', this.locale);
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: event.title,
                                subHeader: event.desc,
                                message: 'From: ' + start + '<br><br>To: ' + end,
                                buttons: ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Time slot was clicked
    AddactivitiesPage.prototype.onTimeSelected = function (ev) {
        var selected = new Date(ev.selectedTime);
        this.event.startTime = selected.toISOString();
        selected.setHours(selected.getHours() + 1);
        this.event.endTime = (selected.toISOString());
    };
    tslib_1.__decorate([
        ViewChild(CalendarComponent),
        tslib_1.__metadata("design:type", CalendarComponent)
    ], AddactivitiesPage.prototype, "myCal", void 0);
    AddactivitiesPage = tslib_1.__decorate([
        Component({
            selector: 'app-addactivities',
            templateUrl: './addactivities.page.html',
            styleUrls: ['./addactivities.page.scss'],
        }),
        tslib_1.__param(2, Inject(LOCALE_ID)),
        tslib_1.__metadata("design:paramtypes", [Router,
            AlertController, String, Storage])
    ], AddactivitiesPage);
    return AddactivitiesPage;
}());
export { AddactivitiesPage };
//# sourceMappingURL=addactivities.page.js.map