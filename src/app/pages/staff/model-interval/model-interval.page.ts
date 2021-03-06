import { Component, OnInit } from '@angular/core';
import { Model } from 'src/app/class/model';
import { StaffService } from 'src/app/service/staff.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-model-interval',
  templateUrl: './model-interval.page.html',
  styleUrls: ['./model-interval.page.scss'],
})
export class ModelIntervalPage implements OnInit {

  model: Model = new Model();

  constructor(private staffservice: StaffService, private router: Router, private http: HttpClient, private global: GlobalService, private toast: ToastController) { }

  ngOnInit() {
  }

  onSave() {
    console.log(this.model)
    this.http.post(this.global.url + '/save', { "name": this.model.name }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).subscribe(res => {
      this.toast.create({
        message: res['message'],
        buttons: [
          {
            text: 'Close',
            handler: () => { res => res.dismiss(); this.router.navigate(['/item']) }
          }
        ]
      }).then( res => res.present() )
    })
  }

}
