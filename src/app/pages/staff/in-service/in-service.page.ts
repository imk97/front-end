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
  certain: any;
  progress: boolean = true


  ngOnInit() {
    this.scanCode();
  }

  scanCode() {
    this.barcodeScanner.scan().then(
      barcode => {
        this.scannedCode = barcode
        const nurl = `${this.global.url + '/services'}`;
        this.http.post(nurl, {
          'plateNum': this.scannedCode['text'],
          'date': formatDate('2019-12-23', 'yyyy-MM-dd', 'en')
        }, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.global.token()}`
          })
        }).subscribe(res => {
          this.data = res['message']
          console.log(this.data)
        });
      }
    )
  }

  start(item: string, proc: string) {
    const nurl = `${this.global.url + '/process'}`;
    this.http.post(nurl, {
      'item': item
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      console.log(res)
      let it = res['item']
      for (var i = 0; i < this.data.length; i++) {
        if (it == this.data[i]) {
          this.certain = it;
          console.log(this.certain)
          //this.dataservice.setOption(this.certain)
        }
      }
    })
    //this.dataservice.setOption(item)
    //this.progressbar()
    /*for(var i = 0; i < this.data.length; i++) {
      if(item == this.data[i]) {
        this.certain = item;
        console.log(this.certain)
      }
    }*/
  }

  progressbar() {
    let item = this.dataservice.getOption()
    for (var i = 0; i < this.data.length; i++) {
      if (item == this.data[i]) {
        this.certain = item;
        console.log(this.certain)
      }
    }
  }


  /*end(item: string) {
    for(var i = 0; i < this.data.length; i++) {
      if(item == this.data[i]) {
        console.log(item)
        this.certain = item
      }
    }
  }*/

  save() {
    let today = new Date()
    this.http.post(this.global.url + '/service', {
      's_id': sessionStorage.getItem('id'),
      'b_plateNum': 'JHR3801',
      'type': this.service,
      'time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'date': formatDate(today, 'yyyy-MM-dd', 'en')
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`
        })
      }).subscribe(res => {
        if (res['0'] == '201') {
          this.toast.create({
            message: res['message'], buttons: [{
              text: 'Okay',
              handler: () => { this.router.navigate(['/in-service']) }
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
    /*console.log(this.model)
    if (this.milleage >= '1,000km' || this.milleage < '5,000km') {
      console.log(this.milleage)
      this.milleage = '1,000km'
    } else if (this.milleage >= '5,000km' || this.milleage < '10,000km') {
      console.log(this.milleage)
      this.milleage = '5,000km'
    } else if (this.milleage >= '20,000km' || this.milleage < '30,000km') {
      console.log(this.milleage)
      this.milleage = '20,000km'
    }
    this.dataservice.setInterval(this.milleage)
    let today = new Date()
    this.http.post(this.global.url + '/search', {
      'model_name': this.scannedCode['text'],
      'interval_model': this.milleage
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}` })
    }).subscribe(res => {
      console.log(res['search'])
      const data = res['search'];
      for (var i = 0; i < data.length; i++) {
        this.items.push(data[i].item)
        this.item[i] = data[i].item
      }
    });*/
    //console.log(JSON.stringify(this.estTime['time']))

  }


}
