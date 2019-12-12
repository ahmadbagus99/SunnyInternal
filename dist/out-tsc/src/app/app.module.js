import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ShareService } from 'src/app/share/share';
import { HttpModule } from '@angular/http';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PostProvider } from 'src/providers/post-providers';
import { HttpClientModule } from '@angular/common/http';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { NgCalendarModule } from 'ionic2-calendar';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        NgModule({
            declarations: [AppComponent],
            entryComponents: [],
            imports: [
                HttpClientModule,
                BrowserModule,
                IonicModule.forRoot(),
                AppRoutingModule,
                NgCalendarModule,
                HttpModule,
                IonicStorageModule.forRoot(),
                AngularFireModule.initializeApp(environment.firebase, 'Sunny'),
                AngularFirestoreModule,
                AngularFireStorageModule // imports firebase/storage only needed for storage features
            ],
            providers: [
                PostProvider,
                CallNumber,
                StatusBar,
                SplashScreen,
                ShareService,
                NativePageTransitions,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map