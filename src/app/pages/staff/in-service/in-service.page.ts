import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { EstTime } from 'src/app/class/EstTime';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-in-service',
  templateUrl: './in-service.page.html',
  styleUrls: ['./in-service.page.scss'],
})
export class InServicePage implements OnInit {

  constructor(private barcodeScanner: BarcodeScanner, private http: HttpClient, public global: GlobalService, private toast: ToastController, private router: Router, private userservice: UserService,
    private dataservice: DataService, private action: ActionSheetController) { }

  scannedCode = null;
  estTime: EstTime = new EstTime();
  public items: string;
  public service: string

  //items: string[] = [];
  data = [];
  today = new Date();
  certain = [];
  starter: boolean = true
  stoper: boolean = true
  test = []


  ngOnInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcode => {
      this.scannedCode = barcode
      const nurl = `${this.global.url + '/services'}`;
      this.http.post(nurl, { 'plateNum': this.scannedCode['text'], 'date': formatDate(this.today, 'yyyy-MM-dd', 'en') }, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
      }).subscribe(res => {
        this.data = res['message']
        console.log(this.data)
      });
    }
    )
  }

  status() {
    const nurl = `${this.global.url + '/set'}`;
    this.http.post(nurl, {}, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}`, 'Accept': 'application/json' })
    }).subscribe(res => { this.starter = res['message']; })
  }

  end(item: string, status: string) {
    console.log(item)
    this.test.push(item)
    console.log(this.test)
    //this.test = []
    //this.test.push(item)
    const check = []
    check.push(item)
    const nurl = `${this.global.url + '/set'}`;
    this.http.post(nurl, { 'item': this.test.toString(), 'status': status }, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}` }) }).
      subscribe(res => {
        this.certain = res['message'][0]
        console.log(this.certain)
      })
    if (this.test.length == check.length) {
      this.starter = true;
    }
  }

}
