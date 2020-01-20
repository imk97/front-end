import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { Password } from 'src/app/class/password';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})

export class PasswordPage implements OnInit {

  Newpassword: Password = new Password();
  constructor(private toast: ToastController, private http: HttpClient, private global: GlobalService,
    private userservice: UserService, private router: Router, private alert: AlertController) { }

  ngOnInit() {
  }

  update() {
    if (this.Newpassword.new_password != this.Newpassword.con_password) {
      this.toast.create({
        message: 'Password not match. Check the spelling again.',
        duration: 2000,
      }).then(res => res.present());
    } else {
      const nurl = `${this.global.url + '/password'}`;
      this.http.put(nurl, { 'curr_password': this.Newpassword.curr_password, 'new_password': this.Newpassword.new_password, 'id': sessionStorage.getItem('id') },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.global.token()}`,
            'Accept': 'application/json'
          })
        }).subscribe(res => {
          if (res['message'] == 'password not match') {
            this.alert.create({
              message: 'Password not match. Try Again',
              buttons: ['OK']
            }).then(res => res.present())
          } else if (res['message'] == 'not updated') {
            this.alert.create({
              message: 'Password not updated',
              buttons: ['OK']
            }).then(res => res.present())
          } else {
            this.alert.create({
              message: 'Password updated',
              buttons: ['OK']
            }).then(res => res.present())
          }
        }
        );
    }
  }

}
