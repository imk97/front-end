import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-listbooking',
  templateUrl: './listbooking.page.html',
  styleUrls: ['./listbooking.page.scss'],
})
export class ListbookingPage implements OnInit {

  bookings = [];
  booking: any;
  scannedCode = null;
  scan = null;
  today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  public date: string;
  public searchcar: string;

  constructor(private bookservice: BookService, private barcodeScanner: BarcodeScanner, private http: HttpClient, public global: GlobalService, private userservice: UserService,
    private dataservice: DataService, private router: Router, private alert: AlertController, private loading: LoadingController) { }

  ngOnInit() {
    this.listBook();
    //this.scanCode()
  }

  listBook(): void {
    console.log(formatDate(this.today, 'yyyy-MM-dd', 'en'))
    this.date = this.today
    this.bookservice.list(this.date).subscribe(
      booking => {
        if(booking['plateInfo'] == 'No data') {
          this.alert.create({
            message: booking['plateInfo'],
            buttons: [{
              text: 'Okay',
              handler: () => { this.router.navigate(['/staff']) }
            }]
          }).then(res => { res.present() })
        } else {
          this.bookings = booking['plateInfo']
        }
      }
    )
  }

  search(): void {
    /*console.log(this.searchcar)
    const nurl = `${this.global.url + '/searchcar'}`
    this.http.post(nurl, {
      'plateNum': this.searchcar,
      'date': this.today
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(
      res => {
        //this.bookings = bookings['date']
        //console.log(res['message'])
        this.loading.create({
          message: 'Please wait',
          duration: 500,
          spinner: 'crescent'
        }).then(res => {
          res.present()
          const data = res['message']
          this.bookings = []
          for(var i=0; i<data.length;i++)
          {
            this.bookings.push(data[i])
          }
          res.dismiss()
        });
      }
    )*/
  }

  getPlateNum(plateNum: string): void {
    this.dataservice.setPlateNum(plateNum)
    console.log(this.dataservice.getService())
    if (this.dataservice.getService() == 1) {
      this.router.navigate(['/assignservice'])
    } else if (this.dataservice.getService() == 2) {
      this.router.navigate(['/view-service'])
    } else if (this.dataservice.getService() == 3) {
      this.router.navigate(['/update-service'])
    } else {
      this.router.navigate(['/qrcode'])
    }
  }

  /*scanCode() {
    this.barcodeScanner.scan().then(
      barcode => {
        let today = new Date()
        this.scannedCode = barcode
        this.scan = 'in-queue'
        this.http.post(this.global.url + '/service', {
          'u_id': sessionStorage.getItem('id'),
          'type': this.scan,
          'start_time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
          'end_time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        }, this.httpOptions).subscribe(
          res => {
            if (res['message']) {
              this.listBook();
            }
          }
        )
      }
    )
  }*/
}
