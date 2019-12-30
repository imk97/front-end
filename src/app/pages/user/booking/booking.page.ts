import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/class/book';
import { BookService } from 'src/app/service/book.service';
import { AlertController, MenuController, Platform, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage {

  book: Book = new Book();
  encodeData: any;
  currentYear: any;
  currentMonth: any;
  time: [];
  getDate: Boolean = true;
  model: string[] = [];
  Item: string[] = [];
  Time : string;

  intervals: any[] = [
    '1,000km'
  ]
  
  constructor(private bookservice: BookService, private alertController: AlertController,
    private router: Router, private menu: MenuController, public modalCtrl: ModalController, private http: HttpClient, public global: GlobalService) { }

  ionViewWillEnter() {
    this.menu.enable(true)
    this.getModel()
    this.book.user_id = Number(sessionStorage.getItem('id'))
    this.currentYear = new Date().getFullYear();
  }


  onSave() {
    console.log(this.book)
    this.bookservice.add(this.book).subscribe(
      async res => await this.alertController.create({
        message: res['message'],
        buttons: [
          {
            text: 'Okay',
            handler: () => {
              this.router.navigate(['/user'])
            }
          }
        ]
      }).then(res => { res.present() })
    )
  }

  availableHours() {
    console.log(this.book.date)
    this.http.post(this.global.url + '/availableHours', {
      "date": this.book.date,
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}` })
    }).subscribe(
      res => {
        console.log(res['availabelHours'])
        this.Time = res['availabelHours']
      } 
    );
  }

  getModel() {
    this.http.get(this.global.url+'/list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe( res => { 
      const models = res['model'] 
      for( var i=0 ;i < models.length; i++) {
        this.model.push(models[i].name)
      }
    })
  }
  



}
