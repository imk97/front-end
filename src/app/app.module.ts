import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from './message.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { UserPageModule } from './pages/staff/list-user/user.module';
import { FormsModule } from '@angular/forms';
import { AdduserPageModule } from './pages/adduser/adduser.module';
import { DetailuserPageModule } from './pages/staff/detailuser/detailuser.module';
import { EditUserPageModule } from './pages/user/edit-user/edit-user.module';
import { HomePageModule } from './pages/user/home/home.module';
import { AuthGuard } from './auth.guard';
import { LoginPageModule } from './pages/login/login.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

//import { PasswordPageModule } from './pages/user/password/password.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginPageModule,
    HomePageModule,
    UserPageModule,
    AdduserPageModule,
    DetailuserPageModule,
    EditUserPageModule,
    //PasswordPageModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    HttpErrorHandler,
    MessageService,
    BarcodeScanner,
    Network,
    Dialogs,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
