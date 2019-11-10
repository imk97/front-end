import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/class/book';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.page.html',
  styleUrls: ['./edit-booking.page.scss'],
})
export class EditBookingPage implements OnInit {

  constructor(
    private bookservice: BookService,
    public route: ActivatedRoute, 
    public router: Router,
    ) { }

  book: Book = new Book();
  books: [];
  data: any;

  ngOnInit() {
    if(this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
    }
    /*this.bookservice.listbyid(
      Number(sessionStorage.getItem('id'))
    ).subscribe(
      res => {
        console.log(res['book'])
        this.books = res['book'];
        for(var i=0; i<this.books.length; i++) {
          this.book = this.books[i]
          console.log(this.book)
        }
      }
    )*/
  }

}
