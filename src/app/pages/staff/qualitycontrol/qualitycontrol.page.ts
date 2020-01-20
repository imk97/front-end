import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EstTime } from 'src/app/class/EstTime';

@Component({
  selector: 'app-qualitycontrol',
  templateUrl: './qualitycontrol.page.html',
  styleUrls: ['./qualitycontrol.page.scss'],
})
export class QualitycontrolPage implements OnInit {

  scannedCode = null;
  estTime : EstTime = new EstTime();

  constructor(private barcodeScanner: BarcodeScanner, private http: HttpClient,
    public global: GlobalService, private toast: ToastController, private router: Router) { }

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
    let today = new Date()
    this.http.post(this.global.url + '/service', {
      's_id': sessionStorage.getItem('id'),
      'b_plateNum': this.scannedCode['text'],
      'type': 'quality-control',
      'start_time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'estimation_time': this.estTime['time']
    }, 
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).subscribe( res => {
      
    })
  }
}
