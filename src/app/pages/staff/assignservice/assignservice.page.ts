import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { DataService } from 'src/app/service/data.service';
import { StaffService } from 'src/app/service/staff.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { formatDate } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignservice',
  templateUrl: './assignservice.page.html',
  styleUrls: ['./assignservice.page.scss'],
})
export class AssignservicePage {

  today = new Date();
  listModel: any;
  itemsData = [];
  form: FormGroup;


  public model: string;
  public milleage: string;
  public listItem: string[] = [];

  

  constructor(private bookservice: BookService, private dataservice: DataService, private staffservice: StaffService, private http: HttpClient,
    private global: GlobalService, private formBuilder: FormBuilder, private toast: ToastController, private router: Router) {
    this.form = this.formBuilder.group({
      items: new FormArray([])
    });
    this.addCheckboxes();
  }

  ionViewWillEnter() {
    this.listcar()
  }

  listcar() {
    this.staffservice.listCar().subscribe(res => {
      this.listModel = res['model'] as []
      console.log(this.listModel)
    }
    )
  }

  listitem() {
    const nurl = `${this.global.url + '/items'}/${this.model}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      const data = res['items']
      for (var i = 0; i < data.length; i++) {
        this.itemsData.push(data[i])
      }
      this.addCheckboxes()
    });
  }

  private addCheckboxes() {
    console.log(this.itemsData)
    this.itemsData.forEach((o, i) => {
      const control = new FormControl(i === 0);
      (this.form.controls.items as FormArray).push(control);
    });
  }

  onSave() {
    const selectedItem = this.form.value.items.map((v, i) => v ? this.itemsData[i].item : null).filter(v => v !== null);
    console.log(selectedItem)
    let today = new Date()
    this.http.post(this.global.url + '/service', {
      's_id': sessionStorage.getItem('id'),
      'b_plateNum': this.dataservice.getPlateNum(),
      'type': selectedItem.toString(),
      'time': today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      'date': formatDate(today,'yyyy-MM-dd', 'en')
    },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`
        })
      }).subscribe(res => {
        if (res['0'] == '201') {
          this.toast.create({
            message: res['message'], buttons: [{
              text: 'Okay',
              handler: () => { this.router.navigate(['/staff']) }
            }
            ]
          }
          ).then(toast => toast.present())
        } else {
          this.toast.create(
            {
              message: res['message'],
              buttons: [
                {
                  text: 'Again',
                  handler: () => { this.router.navigate(['/assignservice']) }
                }
              ]
            }
          ).then(toast => toast.present())
        }
      }
      )
  }

  /*onSave() {
    const selectedItems = this.form.value.itemsData.map((v, i) => v ? this.itemsData[i] : null).filter()
    console.log(selectedItem)
    /*console.log(this.model)
    if (this.milleage >= '1,000km' || this.milleage < '5,000km') {
      console.log(this.milleage)
      this.milleage = '1,000km'
    } else if (this.milleage >= '5,000km' || this.milleage < '10,000km') {
      console.log(this.milleage)
      this.milleage = '5,000km'
    } else if (this.milleage >= '20,000km' || this.milleage < '30,000km') {
      console.log(this.milleage)
      this.milleage = '20,000km'
    }
    this.dataservice.setInterval(this.milleage)
    let today = new Date()
    this.http.post(this.global.url + '/search', {
      'model_name': this.model,
      'interval_model': this.milleage
    }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${this.global.token()}` })
    }).subscribe(res => {
      console.log(res['search'])
      const data = res['search'];
      for (var i = 0; i<data.length; i++) {
        this.items.push(data[i].item)
        this.item[i] = data[i].item
      }
    });

  }*/



  /*saveToggle() {
    console.log(this.item)
    this.http.post(this.global.url+'/service', {
      's_id': sessionStorage.getItem('id'),
      'b_plateNum': this.dataservice.getPlateNum(),
      'type': this.infotoggle,
      'start_time': '',
      'estimation_time': '',
      'model_name': this.model,
      'interval': this.milleage
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe( res => {
      console.log(res['message'])
    });
  }*/




}
