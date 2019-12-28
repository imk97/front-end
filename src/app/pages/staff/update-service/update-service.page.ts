import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalService } from 'src/app/global.service';
import { DataService } from 'src/app/service/data.service';
import { formatDate } from '@angular/common';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { StaffService } from 'src/app/service/staff.service';

@Component({
  selector: 'app-update-service',
  templateUrl: './update-service.page.html',
  styleUrls: ['./update-service.page.scss'],
})
export class UpdateServicePage {

  today = new Date()
  item = []
  itemsData = []
  form: FormGroup
  listModel: any

  public model: string

  constructor(private http: HttpClient, private global: GlobalService, private dataservice: DataService, private formBuilder: FormBuilder, private staffservice: StaffService) {
    this.form = this.formBuilder.group({
      items: new FormArray([])
    })
    this.addCheckboxes()
   }

  ionViewDidEnter() {
    this.id()
  }

  id() {
    const nurl = `${this.global.url + '/id'}`
    this.http.post(nurl, {
      'plateNum': this.dataservice.getPlateNum(),
      'date': formatDate(this.today, 'yyyy-MM-dd', 'en')
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      console.log(res['message'])
      const data = res['message']
      this.dataservice.setID(data)
      this.listcar()
    })
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
      this.itemsData = res['items']
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

  onUpdate() {
    console.log(this.dataservice.getID())
    console.log(this.model)
    const selectedItem = this.form.value.items.map((v, i) => v ? this.itemsData[i].item : null).filter(v => v !== null);
    console.log(selectedItem)
    const nurl = `${this.global.url+'/update'}`
    this.http.post(nurl, {
      'id': this.dataservice.getID(),
      's_id': sessionStorage.getItem('id'),
      'b_plateNum': this.dataservice.getPlateNum(),
      'type': selectedItem.toString(),
      'time': this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds(),
      'date': formatDate(this.today,'yyyy-MM-dd', 'en')
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).subscribe(res => {
      console.log(res['message'])
    })
  }

}
