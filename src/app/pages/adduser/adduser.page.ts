import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController, AlertController  } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
  providers: [UserService]
})
export class AdduserPage implements OnInit {

  constructor(private userservice: UserService, public toastController: ToastController, public router: Router,
    private alert: AlertController ) { }

  roles: any = [
    'user',
    'staff'
  ]

  ngOnInit() {
  }

  user: User = new User();
  users: User;

  onSave(): void {
    this.user.role = 1;
    console.log(this.user)
    this.userservice.addUser(this.user).subscribe(res => { console.log(res['message'])
      if(res['message'] != 'Successfully saved') {
        this.alert.create({
          message: res['message'],
          buttons: [
            {
              text: 'OK',
              handler: () => { this.router.navigate(['/add']) }
            }
          ]
        }).then(res => res.present());
      } else {
        this.alert.create({
          message: res['message'],
          buttons: [
            {
              text: 'OK',
              handler: () => { this.router.navigate(['/login']) }
            }
          ]
        }).then(res => res.present());
      }
    });
  }
}
