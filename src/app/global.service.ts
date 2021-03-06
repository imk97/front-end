import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from './service/user.service';
import { tokenName } from '@angular/compiler';
import { DataService } from './service/data.service';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public url = 'http://192.168.49.91:8000/api';
  constructor(private dataservice: DataService, private http: HttpClient, private router: Router ) {}

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
    const nurl = `${this.url+'/logout'}`
    this.http.get(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token()}`
      })
    }).subscribe(
      data => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('username');
        this.router.navigate(['/login'])
      }
    )
  }
}
