import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public email: string;
  constructor(private http: HttpClient, private global: GlobalService, private alert: AlertController, private router: Router) { }

  ngOnInit() {
  }

  submit() {
    const nurl = `${this.global.url+'/password/email'}`
    this.http.post(nurl, { 'email': this.email }, { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.global.token()}`,
      'Accept': 'application/json'
    })}).subscribe(res => {
      this.alert.create({
        message: res['message'],
        buttons: [
          {
            text: 'Okay',
            handler: () => { this.router.navigate(['/login']) }
          }
        ]
      }).then(res => { res.present() })
    })
  }

}
