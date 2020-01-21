import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/class/user';
import { BookService } from 'src/app/service/book.service';
import { StaffService } from 'src/app/service/staff.service';
import { DataService } from 'src/app/service/data.service';
import { GlobalService } from 'src/app/global.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  username: string;
  data: User = new User();
  book = [];

  constructor
  ( 
    public route: ActivatedRoute,
    public router: Router, private toast: ToastController,
    private menu: MenuController, private alert: AlertController,
    private global: GlobalService, private action: ActionSheetController,
    private bookservice: BookService, private staffservice: StaffService,
    private dataservice: DataService, private userservice: UserService
  ) {  }

  ionViewWillEnter() {
    this.menu.enable(true)
    this.getData();
    this.getUsername();
    //this.getUsername();
    /*if(this.route.snapshot.data['special']) {
      this.data = this.route.snapshot.data['special'];
      console.log(this.data);
    }*/
  }

  doRefresh(event) {
    setTimeout(() => { this.getData(); event.target.complete() }, 200)
  }

  getUsername() {
    this.userservice.getUsersById(Number(sessionStorage.getItem('id'))).subscribe(res => {
      this.data = res['user'][0]
      this.username = this.data.username
    })
  }

  getData() {
    this.bookservice.listbyid( Number(sessionStorage.getItem('id'))).subscribe(res => {
        this.book = res['book'] as []
        console.log(this.book)
      })
  }

  removeToken() {
    this.global.logout();
    this.router.navigate(['/login']);
  }

  home(): void {
    this.router.navigate(['/user'])
  }

  profile(): void {
    this.router.navigate(['/profile'])
  }

  booking(): void {
    this.router.navigate(['/booking'])
  }

  follow(): void {
    this.router.navigate(['/viewbooking'])
  }

  getservice(plateNum: string, id: string) {
    this.action.create({
      buttons: [
        {
          text: 'View',
          handler: () => {
            this.getDetail(plateNum);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log("padam")
            this.alert.create(
              {
                message: 'Are you sure to delete this ' + plateNum + '?',
                buttons: [
                  {
                    text: 'No',
                    handler: () => {
                      this.router.navigate(['/user'])
                    }
                  },
                  {
                    text: 'Yes',
                    handler: () => {
                      this.bookservice.deletebyplateNo(id).subscribe(
                        res => {
                          if (res['message'] == 'deleted') {
                            this.toast.create({
                              message: 'Deleted',
                              duration: 2000
                            }).then(res => res.present())
                          }
                        })
                      setTimeout(() => { this.getData() }, 200)
                    }
                  }
                ]
              }
            ).then(res => res.present())

          }
        }
      ]
    }).then(res => res.present());

  }

  getDetail(plateNum: string) {
    this.dataservice.setPlateNum(plateNum)
    this.router.navigate(['/viewbooking'])
  }

}
