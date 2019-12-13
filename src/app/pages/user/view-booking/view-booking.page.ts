import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/class/book';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.page.html',
  styleUrls: ['./view-booking.page.scss'],
})
export class ViewBookingPage implements OnInit {

  constructor( private bookservice: BookService, private dataservice: DataService, private http: HttpClient, private router: Router, private staffservice: StaffService, 
    public route: ActivatedRoute, private alert: AlertController, private global: GlobalService ) { }

  book : string[] = [];
  data: any;
  today = new Date();
  progress: boolean = false;

  ngOnInit() {
    this.getservice();
  }

  getservice() {
    this.http.post(this.global.url+'/services', {
      'plateNum' : this.dataservice.getPlateNum(),
      'date': formatDate(this.today,'yyyy-MM-dd', 'en')
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'applicaiton/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(
      res => {
        console.log(res['message'])
        if (res['message'] != 'no data') {
          this.data = res['message']
          //this.progress = !!this.dataservice.getOption()
          console.log(this.data)
        } else {
          this.alert.create({
            message: 'No service start',
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.router.navigate(['/user'])
                }
              }
            ]
          }).then(alert => alert.present())

        }

      }
    )
  }

}
