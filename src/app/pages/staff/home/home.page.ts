import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MenuController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { queue } from 'rxjs/internal/scheduler/queue';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private userservice: UserService,
    private alert: AlertController,
    private action: ActionSheetController,
    private router: Router,
    private global: GlobalService
  ) { }

  username: any;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  actionSheet() {
    this.action.create({
      buttons: [
        {
          text: 'Home',
          handler: () => {
            console.log('home')
          }
        },
        {
          text: 'User Access',
          handler: () => {
            this.router.navigate(['/user/home'])
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.logout();
          }
        }
      ]
    }).then(res => { res.present() })
  }

  inqueue() {
    this.action.create({
      buttons: [
        {
          text: 'QR Code',
          handler: () => {
            this.router.navigate(['/listbooking'])
          }
        },
        {
          text: 'Scan',
          handler: () => {
            this.router.navigate(['/in-queue'])
          }
        }
      ]
    }).then(res => { res.present() })
  }

  inservice() {
    this.action.create({
      buttons: [
        {
          text: 'QR Code',
          handler: () => {
            this.router.navigate(['/listbooking'])
          }
        },
        {
          text: 'Scan',
          handler: () => {
            this.router.navigate(['/in-service'])
          }
        }
      ]
    }).then(res => { res.present() })
  }



  logout() {
    this.alert.create({
      message: 'Logout of MCSM?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('cancel')
          }
        },
        {
          text: 'Sure',
          handler: () => {
            this.global.logout();
            this.router.navigate(['/login'])
          }
        }
      ]
    }).then(res => res.present())
  }



}
