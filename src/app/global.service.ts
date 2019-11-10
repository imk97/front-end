import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './service/user.service';
import { tokenName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public url = 'http://192.168.0.104:8000/api';
  constructor( ) {}

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
    return sessionStorage.getItem('token')
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
  }
}
