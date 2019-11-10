import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(private platform: Platform, private splashScreen: SplashScreen,
    private statusBar: StatusBar, private network: Network, private toast: ToastController) {
    this.initializeApp();
    this.disconnect();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  disconnect() {
    this.network.onDisconnect().subscribe(
      res => {
        this.toast.create(
          {
            message: 'Your Phone seems offline.',
            duration: 2000
          }
        ).then(res => res.present())
      }
    );
  }

  connect() {
    this.network.onConnect().subscribe(
      res => this.toast.create(
        {
          message: 'Connected',
          duration: 2000
        }
      ).then(res => res.present())
    );
  }


}
