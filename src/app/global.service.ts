import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './service/user.service';
import { tokenName } from '@angular/compiler';
import { DataService } from './service/data.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public url = 'http://127.0.0.1:8000/api';
  constructor(private dataservice: DataService ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token()}`
    })
  }

  httpOpt = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  token() {
    this.dataservice.getToken()
    return sessionStorage.getItem('token');
  }

  username() {
    return this.dataservice.getUsername()
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
  }
}
