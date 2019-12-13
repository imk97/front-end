import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private data = [];
  public plateNum: any;
  public token: any;
  public username: any;
  public name: any;
  public ic: any;
  public address: any;
  public id: any;
  public service: any;
  public interval: any;
  public option: any;

  setData(id: string | number, data: any) { this.data[id] = data; }
  setPlateNum(plate: any) { this.plateNum = plate; }
  setToken(token: any) { this.token = token; }
  setName(name: any) { this.name = name; }
  setIC(ic: any) { this.ic = ic }
  setAddress(address: any) { this.address = address }
  setUsername(username: any) { this.username = username; }
  setID(id: any) { this.id = id }
  setService(service: number) { this.service = service }
  setInterval(interval: string) { this.interval = interval }
  setOption(option: string) { this.option = option }

  getToken() { return this.token; }
  geName() { return this.name; }
  getUsername() { return this.username; }
  getIC() { return this.ic }
  getAddress() { return this.address }
  getName() { return this.name }
  getID() {  return this.id }
  getService() { return this.service }
  getPlateNum() { return this.plateNum; }
  getData(id: string | number) { return this.data[id]; }
  getInterval() { return this.interval }
  getOption() { return this.option }
}
