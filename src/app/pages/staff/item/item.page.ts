import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/service/staff.service';
import { ModelInterval } from 'src/app/class/model-interval';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {

  modelinterval: ModelInterval = new ModelInterval();
  models: any;
  constructor(private staffservice: StaffService, private http: HttpClient, private global: GlobalService,private router: Router, private alert: AlertController) { }

  ionViewWillEnter() {
    this.listModel();
  }

  onSave() {
    console.log(this.modelinterval)
    this.staffservice.storeService(this.modelinterval).subscribe(res => { 
      if(res['message'] == 'Save failed!') {
        this.alert.create({
          message: res['message'],
          buttons: [
            {
              text: 'OK',
              handler: () => { this.router.navigate(['/item']) }
            }
          ]
        }).then( res => res.present());
      } else {
        this.router.navigate(['/staff'])
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
