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

import { UserPageModule } from './user/user.module';
import { FormsModule } from '@angular/forms';
import { AdduserPageModule } from './adduser/adduser.module';
import { DetailuserPageModule } from './detailuser/detailuser.module';
import { EditUserPageModule } from './edit-user/edit-user.module';
import { HomePageModule } from './home/home.module';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { LoginPageModule } from './login/login.module';


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
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    HttpErrorHandler,
    MessageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }*/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
