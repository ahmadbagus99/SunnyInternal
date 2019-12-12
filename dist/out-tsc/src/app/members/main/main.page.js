import * as tslib_1 from "tslib";
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ShareService } from 'src/app/share/share';
import { DataService } from 'src/app/services/data.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { PostProvider } from 'src/providers/post-providers';
import { IonSlides } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
var TOKEN_user = 'user';
var MainPage = /** @class */ (function () {
    function MainPage(storage, authService, router, share, dataService, postPvdr, loadingController) {
        this.storage = storage;
        this.authService = authService;
        this.router = router;
        this.share = share;
        this.dataService = dataService;
        this.postPvdr = postPvdr;
        this.loadingController = loadingController;
        this.sliderOpts = {
            autoplay: true,
            speed: 1000,
            zoom: {
                maxRatio: 5
            }
        };
        this.Activity = [];
        this.items = [];
        this.itemsaccount = [];
        this.limit = 10;
        this.start = 0;
    }
    MainPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.items = [];
        this.start = 0;
        this.LoadProfile();
        //Activity
        this.storage.get('Activity').then(function (item) {
            _this.Activity = item;
        });
    };
    MainPage.prototype.ngOnInit = function () {
        //   this.barChart = new Chart(this.barCanvas.nativeElement, {
        //     type: "bar",
        //     data: {
        //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
        //       datasets: [
        //         {
        //           label: "Kuartil 1",
        //           data: [12, 19, 3, 5, 2, 3],
        //           backgroundColor: [
        //             "rgba(255, 99, 132, 0.2)",
        //             "rgba(54, 162, 235, 0.2)",
        //             "rgba(255, 206, 86, 0.2)",
        //             "rgba(75, 192, 192, 0.2)",
        //             "rgba(153, 102, 255, 0.2)",
        //             "rgba(255, 159, 64, 0.2)"
        //           ],
        //           borderColor: [
        //             "rgba(255,99,132,1)",
        //             "rgba(54, 162, 235, 1)",
        //             "rgba(255, 206, 86, 1)",
        //             "rgba(75, 192, 192, 1)",
        //             "rgba(153, 102, 255, 1)",
        //             "rgba(255, 159, 64, 1)"
        //           ],
        //           borderWidth: 1
        //         }
        //       ]
        //     },
        //     options: {
        //       scales: {
        //         yAxes: [
        //           {
        //             ticks: {
        //               beginAtZero: true
        //             }
        //           }
        //         ]
        //       }
        //     }
        //   });
        var _this = this;
        //   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        //     type: "doughnut",
        //     data: {
        //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
        //       datasets: [
        //         {
        //           label: "Kuartil 2",
        //           data: [12, 19, 3, 5, 2, 3],
        //           backgroundColor: [
        //             "rgba(255, 99, 132, 0.2)",
        //             "rgba(54, 162, 235, 0.2)",
        //             "rgba(255, 206, 86, 0.2)",
        //             "rgba(75, 192, 192, 0.2)",
        //             "rgba(153, 102, 255, 0.2)",
        //             "rgba(255, 159, 64, 0.2)"
        //           ],
        //           hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
        //         }
        //       ]
        //     }
        //   });
        //   this.lineChart = new Chart(this.lineCanvas.nativeElement, {
        //     type: "line",
        //     data: {
        //       labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli"],
        //       datasets: [
        //         {
        //           label: "Kuartil 3",
        //           fill: false,
        //           lineTension: 0.1,
        //           backgroundColor: "rgba(75,192,192,0.4)",
        //           borderColor: "rgba(75,192,192,1)",
        //           borderCapStyle: "butt",
        //           borderDash: [],
        //           borderDashOffset: 0.0,
        //           borderJoinStyle: "miter",
        //           pointBorderColor: "rgba(75,192,192,1)",
        //           pointBackgroundColor: "#fff",
        //           pointBorderWidth: 1,
        //           pointHoverRadius: 5,
        //           pointHoverBackgroundColor: "rgba(75,192,192,1)",
        //           pointHoverBorderColor: "rgba(220,220,220,1)",
        //           pointHoverBorderWidth: 2,
        //           pointRadius: 1,
        //           pointHitRadius: 10,
        //           data: [65, 59, 80, 81, 56, 55, 40],
        //           spanGaps: false
        //         }
        //       ]
        //     }
        //   });
        this.storage.get('auth-token').then(function (items) {
            _this.item = items;
        });
        this.storage.get('session_storage').then(function (iduser) {
            _this.items2 = iduser;
            _this.items2 = _this.items2.map(function (user) { return user.id; });
            _this.user = parseInt(_this.items2);
            _this.storage.set('IdLogin', _this.user);
        });
    };
    MainPage.prototype.prospect = function () {
        this.router.navigate(['members/prospect']);
    };
    MainPage.prototype.isReadonly = function () {
        return true;
    };
    MainPage.prototype.doRefresh = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.ionViewWillEnter();
            event.target.complete();
        }, 500);
    };
    MainPage.prototype.LoadProfile = function () {
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
    tslib_1.__decorate([
        ViewChild('mySlider'),
        tslib_1.__metadata("design:type", IonSlides)
    ], MainPage.prototype, "slider", void 0);
    tslib_1.__decorate([
        ViewChild("barCanvas"),
        tslib_1.__metadata("design:type", ElementRef)
    ], MainPage.prototype, "barCanvas", void 0);
    tslib_1.__decorate([
        ViewChild("doughnutCanvas"),
        tslib_1.__metadata("design:type", ElementRef)
    ], MainPage.prototype, "doughnutCanvas", void 0);
    tslib_1.__decorate([
        ViewChild("lineCanvas"),
        tslib_1.__metadata("design:type", ElementRef)
    ], MainPage.prototype, "lineCanvas", void 0);
    MainPage = tslib_1.__decorate([
        Component({
            selector: 'app-main',
            templateUrl: './main.page.html',
            styleUrls: ['./main.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Storage,
            AuthenticationService,
            Router,
            ShareService,
            DataService,
            PostProvider,
            LoadingController])
    ], MainPage);
    return MainPage;
}());
export { MainPage };
//# sourceMappingURL=main.page.js.map