import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/service/user.service';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbooking',
  templateUrl: './listbooking.page.html',
  styleUrls: ['./listbooking.page.scss'],
})
export class ListbookingPage implements OnInit {

  constructor
  (
    private bookservice: BookService, private barcodeScanner: BarcodeScanner,
    private http: HttpClient, public global: GlobalService,
    private userservice: UserService, private dataservice: DataService,
    private router: Router
  ) { }

  bookings = [];
  booking : any;
  scannedCode = null;
  scan = null;

  ngOnInit() {
    this.listBook();
    //this.scanCode()
  }

  listBook(): void {
    this.bookservice.list().subscribe(
      bookings => {
        this.bookings = bookings['data'] as []
        console.log(this.bookings)
      }
    )
  }

  getPlateNum(plateNum: string): void {
    this.dataservice.setPlateNum(plateNum)
    this.router.navigate(['/qrcode'])
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
