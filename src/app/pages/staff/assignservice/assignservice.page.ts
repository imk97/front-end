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
      //const data = res['items']
      this.itemsData = res['items']
      /*for (var i = 0; i < data.length; i++) {
        this.itemsData.push(data[i])
      }*/
      this.addCheckboxes()
    });
  }

  private addCheckboxes() {
    console.log(this.itemsData)
    const itemArray = this.form.controls.items as FormArray
    itemArray.clear()
    this.itemsData.forEach((i) => {
      const control = new FormControl(i);
      itemArray.push(control);
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

  onUpdate(id: string) {
    console.log(id)
  }
}
