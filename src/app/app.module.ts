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

import { NgCalendarModule  } from 'ionic2-calendar';

import { MainPage } from 'src/app/members/main/main.page';
//pdf
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { CreatPDF } from 'src/app/services/createPDF'

@NgModule({
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
  ],
  providers: [
    PostProvider,
    CreatPDF,
    MainPage,
    CallNumber,
    StatusBar,
    SplashScreen,
    ShareService,
    NativePageTransitions,
    File,
    FileOpener,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
