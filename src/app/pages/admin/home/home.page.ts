import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  users = []
  hide : boolean = true

  public searchuser: string

  constructor(private http: HttpClient, private global: GlobalService, private toast: ToastController) { }

  ionViewWillEnter() {  }

  user() {
    const nurl = `${this.global.url + '/users'}`
    this.http.get(nurl, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}`, 'Accept': 'application/json' }) }).subscribe(
      res => {
        this.users = []
        this.users = res['data']
        this.hide = false
      }
    )
  }

  staff() {
    const nurl = `${this.global.url + '/staff'}`
    this.http.get(nurl, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}`, 'Accept': 'application/json' }) }).subscribe(
      res => {
        this.users = []
        this.users = res['data']
        this.hide = false
      }
    )
  }

  onAssign(id: string) {
    const nurl = `${this.global.url+'/role'}/${id}`
    this.http.get(nurl, { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}`, 'Accept': 'application/json' }) }).subscribe(
      res => {
        this.toast.create({
          message: res['message'],
          buttons: [
            {
              text: 'Close',
              handler: () => { res => { res.dismiss() } }
            }
          ]
        }).then( res => { res.present() })
      }
    )
  }

  onhide() {
    console.log("test")
    this.hide = true
  }

}
