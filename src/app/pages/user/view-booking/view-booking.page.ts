import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/class/book';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/service/staff.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.page.html',
  styleUrls: ['./view-booking.page.scss'],
})
export class ViewBookingPage implements OnInit {

  constructor(
    private bookservice: BookService, private dataservice: DataService,
    private router: Router, private staffservice: StaffService,
    public route: ActivatedRoute, private alert: AlertController
  ) { }

  book = [];
  data: any;

  ngOnInit() {
    this.getservice(this.dataservice.getPlateNum());
  }

  getservice(plateNum: string) {
    this.staffservice.getServiceByPlateNum(plateNum).subscribe(
      res => {
        console.log(res['message'])
        if (res['message'] != 'no data') {
          this.book = res['message']
          setInterval(() => { this.book }, 400)
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
