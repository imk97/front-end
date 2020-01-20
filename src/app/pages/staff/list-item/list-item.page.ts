import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StaffService } from 'src/app/service/staff.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.page.html',
  styleUrls: ['./list-item.page.scss'],
})
export class ListItemPage implements OnInit {

  itemsData = [];
  listModel: any;
  data = []
  edited: boolean = true

  public item: string
  public id: string
  public model: string;

  constructor(private global: GlobalService, private http: HttpClient, private staffservice: StaffService, private toast: ToastController, private alert: AlertController) {  }

  ngOnInit() {
    this.listcar()
  }

  listitem() {
    const nurl = `${this.global.url + '/items'}/${this.model}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).subscribe(res => {
      this.itemsData = res['items']
    });
  }

  listcar() {
    this.staffservice.listCar().subscribe(res => {
      this.listModel = res['model'] as []
      console.log(this.listModel)
    })
  }

  onDelete(id: string) {
    const nurl = `${this.global.url + '/delItems'}/${id}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).subscribe(res => {
      if (res['message'] == 'success') {
        this.toast.create({
          message: res['message'],
          duration: 2000
        }).then(res => {
          res.present()
          this.listitem()
        })
      } else if (res['message'] != 'success') {
        this.toast.create({
          message: 'unsuccessful',
          duration: 2000
        }).then(res => { res.present() })
      }
    });
  }

  onUpdate(id: string) {
    this.edited = false
    const nurl = `${this.global.url + '/itemid'}/${id}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).subscribe(res => {
      this.item = res['item'][0].item
      this.id = res['item'][0].id
    })
  }

  update() {
    console.log(this.item)
    console.log(this.id)
    const nurl = `${this.global.url + '/updateItem'}`
    this.http.post(nurl, {
      'item': this.item,
      'id': this.id
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}`, 'Accept': 'application/json' })
    }).subscribe(res => {
      if (res['message'] == 'successful') {
        this.alert.create({
          message: res['message'],
          buttons : [
            {
              text: 'OK',
              handler: () => { this.listitem(); this.edited = true }
            }
          ]
        }).then(res => res.present())
      } else {
        this.alert.create({
          message: res['message'],
          buttons: [
            {
              text: 'Change',
              handler: () => { this.listitem() }
            },
            {
              text: 'OK',
              handler: () => { this.edited = true; this.listitem() }
            }
          ]
        }).then(res => {
          res.present()
        })
      }
    })
  }

}
