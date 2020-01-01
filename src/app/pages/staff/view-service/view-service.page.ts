import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { GlobalService } from 'src/app/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage {

  today = new Date()
  items = [];
  ids = [];

  constructor(private dataservice: DataService, private global: GlobalService, private http: HttpClient, private alert: AlertController, private toast: ToastController, private router: Router) { }

  ionViewDidEnter() {
    this.item()
  }

  item() {
    const nurl = `${this.global.url + '/services'}`;
    this.http.post(nurl, {
      'plateNum': this.dataservice.getPlateNum(),
      'date': formatDate(this.today, 'yyyy-MM-dd', 'en')
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      this.items = res['message']
      this.iditem()
    });
  }

  iditem() {
    const nurl = `${this.global.url + '/id'}`;
    this.http.post(nurl, {
      'plateNum': this.dataservice.getPlateNum(),
      'date': formatDate(this.today, 'yyyy-MM-dd', 'en')
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      this.ids = []
      this.ids.push(res['message'])
    });
  }

  onDelete(id: string) {
    console.log(id)
    this.alert.create({
      message: 'Are you sure to delete this whole service?',
      buttons: [
        {
          text: 'No',
          handler: () => { res => res.dismiss() }
        },
        {
          text: 'Yes',
          handler: () => {
            const nurl = `${this.global.url + '/delete'}/${id}`;
            this.http.get(nurl, {
              'headers': new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.global.token()}`
              })
            }).subscribe(res => {
              this.toast.create({
                message: res['message'],
                buttons: [
                  {
                    text: 'Close',
                    handler: () => { this.router.navigate(['/staff']) }
                  }
                ]
              }).then(res => res.present() )
            })
          }
        }
      ]
    }).then(res => { res.present() })

  }
}
