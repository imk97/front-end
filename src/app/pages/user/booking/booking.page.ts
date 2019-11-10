import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/class/book';
import { BookService } from 'src/app/service/book.service';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  constructor(private bookservice: BookService,
    private alertController: AlertController,
    private router: Router,
    private menu: MenuController) { }

  book: Book = new Book();
  encodeData: any;

  ngOnInit() {
    this.menu.enable(true)
    this.book.user_id = Number(sessionStorage.getItem('id'))
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
      }).then(res => {res.present()})
    )
  }

}
