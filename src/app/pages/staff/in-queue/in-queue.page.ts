import { Component, OnInit, Input } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/service/user.service';
import { EstTime } from 'src/app/class/EstTime';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-in-queue',
  templateUrl: './in-queue.page.html',
  styleUrls: ['./in-queue.page.scss'],
})
export class InQueuePage implements OnInit {

  scannedCode = null;
  estTime: EstTime = new EstTime();

  constructor
    (
      private barcodeScanner: BarcodeScanner,
      private http: HttpClient,
      public global: GlobalService,
      private toast: ToastController,
      private router: Router
    ) { }

  ngOnInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcode => {
        this.scannedCode = barcode
        console.log(this.scannedCode['text'])
      }
    )
  }

  save() {
    console.log(JSON.stringify(this.estTime['time']))
    let today = new Date()
    this.http.post(this.global.url + '/service', {
      's_id': sessionStorage.getItem('id'),
      'type': 'in-queue',
      'start_time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'estimation_time': this.estTime['time'],
      'b_plateNum': this.scannedCode['text']
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
      }).subscribe(
        res => {
          if (res['0'] == '201') {
            this.toast.create(
              {
                message: res['message'],
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => { this.router.navigate(['/staff']) }
                  }
                ]
              }
            ).then(toast => toast.present())
          } else {
            this.toast.create(
              {
                message: res['message'],
                buttons: [
                  {
                    text: 'Scan',
                    handler: () => { this.scanCode() }
                  }
                ]
              }
            ).then(toast => toast.present())
          }
        }
      )
  }

}
