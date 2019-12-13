import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { GlobalService } from 'src/app/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.page.html',
  styleUrls: ['./view-service.page.scss'],
})
export class ViewServicePage {

  today = new Date()
  items : string[] = [];
  constructor(private dataservice: DataService, private global: GlobalService, private http: HttpClient) { }

  ionViewDidEnter() {
    this.item()
  }

  item() {
    const nurl = `${this.global.url + '/services'}`;
    this.http.post(nurl, {
      'plateNum': this.dataservice.getPlateNum(),
      'date': formatDate(this.today, 'yyyy-MM-dd' , 'en')
    },{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      const data = res['message']
      for ( var i = 0; i< data.length; i++) {
        this.items.push(data[i])
      }
    });
  }
}
