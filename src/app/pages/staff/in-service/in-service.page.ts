import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EstTime } from 'src/app/class/EstTime';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-in-service',
  templateUrl: './in-service.page.html',
  styleUrls: ['./in-service.page.scss'],
})
export class InServicePage implements OnInit {

  constructor
    (
      private barcodeScanner: BarcodeScanner, private http: HttpClient,
      public global: GlobalService, private toast: ToastController,
      private router: Router, private userservice: UserService
    ) { }

  scannedCode = null;
  estTime: EstTime = new EstTime();

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
      'u_id': sessionStorage.getItem('id'),
      'type': 'in-queue',
      'start_time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'estimation_time': this.estTime['time'],
      'b_plateNum': this.scannedCode['text']
    }, this.global.httpOptions).subscribe(
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
