import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MenuController, AlertController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { queue } from 'rxjs/internal/scheduler/queue';
import { GlobalService } from 'src/app/global.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private userservice: UserService, private alert: AlertController,
    private action: ActionSheetController, private router: Router, private dataservice: DataService,
    private global: GlobalService) { }

  username: any;

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
  }

  actionSheet() {
    this.action.create({
      buttons: [
        {
          text: 'User Access',
          handler: () => {
            this.router.navigate(['/user'])
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

  assignservice() {
    //sessionStorage.setItem('service','1')
    this.dataservice.setService(1);
    this.router.navigate(['/listbooking'])
  }

  inservice() {
    this.action.create({
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.dataservice.setService(2)
            this.router.navigate(['/listbooking'])
          }
        },
        {
          text: 'QR Code',
          handler: () => {
            this.dataservice.setService(0);
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

  model() {
    this.action.create({
      buttons: [
        {
          text: 'Add',
          handler: () => { this.router.navigate(['/model-interval']) }
        },
        /*{
          text: 'View/Delete',
          handler: () => { this.router.navigate(['/']) }
        }*/
      ]
    }).then(res => { res.present() })
  }

  item() {
    this.action.create({
      buttons: [
        {
          text: 'Add',
          handler: () => { this.router.navigate(['/item']) }
        }
      ]
    }).then(res => { res.present() })
  }
  /*qualitycontrol() {
    this.action.create({
      buttons: [
        {
          text: 'QR Code',
          handler: () => { this.router.navigate(['/listbooking']) }
        },
        {
          text: 'Scan',
          handler: () => { this.router.navigate(['/qualitycontrol']) }
        }
      ]
    }).then(res => {res.present() })
  }*/

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
