import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/service/staff.service';
import { Item } from 'src/app/class/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {

  modelinterval: Item = new Item();
  models: any;
  constructor(private staffservice: StaffService, private http: HttpClient, private global: GlobalService, private router: Router, private toast: ToastController) { }

  ionViewWillEnter() {
    this.listModel();
  }

  onSave() {
    console.log(this.modelinterval)
    this.staffservice.storeService(this.modelinterval).subscribe(res => {
      if (res['message'] == 'Save failed!') {
        this.toast.create({
          message: res['message'],
          buttons: [
            {
              text: 'Close',
              handler: () => { res => res.dismiss(); this.router.navigate(['/item']) }
            }
          ]
        }).then(res => res.present());
      } else {
        this.toast.create({
          message: res['message'],
          buttons: [
            {
              text: 'Close',
              handler: () => { res => res.dismiss(); this.router.navigate(['/staff']) }
            }
          ]
        }).then(res => { res.present() })
      }
    });
  }

  listModel() {
    this.http.get(this.global.url + '/list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      this.models = res['model']
    }
    );
  }
}
