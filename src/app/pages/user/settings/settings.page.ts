import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router, private global: GlobalService, private alert: AlertController) { }

  ngOnInit() {
  }

  edituser() {
    this.router.navigate(['/edituser'])
  }

  password() {
    this.router.navigate(['/password'])
  }

  logout() {
    this.alert.create({
      message: 'Are you sure to sign out?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => { }
        },
        {
          text: 'Yes',
          handler: () => {     
            this.global.logout();
            this.router.navigate(['/login']); 
          }
        }
      ]
    }).then(res => res.present());
  }
}
