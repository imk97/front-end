import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-model',
  templateUrl: './update-model.page.html',
  styleUrls: ['./update-model.page.scss'],
})
export class UpdateModelPage {

  models = []
  hide: boolean = true

  public Model: string
  public changemodel: string
  public id: string

  constructor(private http: HttpClient, private global: GlobalService, private toast: ToastController, private alert: AlertController) { }

  ionViewWillEnter() { this.list() }

  list() {
    const nurl = `${this.global.url + '/list'}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      this.models = []
      this.models = res['model']
    })
  }

  onUpdate(id: string) {
    for (var i = 0; i < this.models.length; i++) {
      if (id == this.models[i].id) {
        this.changemodel = this.models[i].name
        this.id = this.models[i].id
        this.hide = false
      }
    }
  }

  update() {
    const nurl = `${this.global.url + '/updateModel'}`
    this.http.post(nurl, {
      'id': this.id,
      'name': this.changemodel
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      this.toast.create({
        message: res['message'],
        buttons: [
          {
            text: 'Close',
            handler: () => { this.hide = true }
          }
        ]
      }).then(res => {
        res.present()
      })
    })
  }

  onDelete(id: string) {
    for (var i = 0; i < this.models.length; i++) {
      if (id == this.models[i].id) {
        this.alert.create({
          message: 'Are you sure want to delete ' + this.models[i].name,
          buttons: [
            {
              text: 'No',
              handler: () => { res => res.dismiss() }
            },
            {
              text: 'Yes',
              handler: () => {
                res => {
                  const nurl = `${this.global.url + '/deleteModel'}/${id}`
                  this.http.get(nurl, {
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${this.global.token()}`
                    })
                  }).subscribe(res => {
                      this.toast.create({
                        message: res['message'],
                        buttons: [
                          {
                            text: 'Close',
                            handler: () => { res => res.dismiss(); this.list() }
                          }
                        ]
                      }).then(res => { res.present() })
                  })
                }
              }
            }
          ]
        }).then(res => { res.present() })
      }
    }


  }

}
