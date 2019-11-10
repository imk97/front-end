import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data = [];
  private plateNum: any;

  setData(id: string | number, data: any) {
    this.data[id] = data;
  }

  getData(id: string | number) {
    return this.data[id];
  }

  setPlateNum(plate: any) {
    this.plateNum = plate;
  }

  getPlateNum() {
    return this.plateNum;
  }

}
