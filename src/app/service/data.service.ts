import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data = [];

  setData(id: string | number, data: any) {
    this.data[id] = data;
  }

  getData(id: string | number) {
    return this.data[id];
  }
}
