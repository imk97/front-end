import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../class/user';
import { Login } from '../class/login';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { GlobalService } from '../global.service';
import { Password } from 'src/app/class/password';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private handleError: HandleError;
  private user = [];

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, public global: GlobalService) { 
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.global.url+'/users', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
    }).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  getUsersById(id:number): Observable<{}> {
    const nurl = `${this.global.url+'/user'}/${id}`;
    return this.http.get(nurl, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
    }).pipe(
      catchError(this.handleError('getUsersById'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.global.url+'/add', user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    })
    .pipe(
      catchError(this.handleError('addUser', user))
    );
  }

  deleteUser(id:number): Observable<{}> {
    const nurl = `${this.global.url+'/user'}/${id}`;
    return this.http.delete(nurl, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
    })
    .pipe(
      catchError(this.handleError('deleteUser'))
    );
  }

  updateUser(user: User, id: number) {
    const nurl = `${this.global.url+'/user'}/${id}`;
    return this.http.put(nurl, user, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
    })
    .pipe(
      catchError(this.handleError('updateUser'))
    );
  }

  changePassword(password: Password) {
    const nurl = `${this.global.url+'/password'}/${password.curr_password}`;
    return this.http.put(nurl, password, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError('changePassword'))
    );
  }

  loginUsers(users: Login): Observable<any> { 
    //console.log(users);
    return this.http.post<User>(this.global.url+'/login', users, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    }).pipe(
      catchError(this.handleError('loginUsers'))
    );
  }

  loggedIn() {
    return !!sessionStorage.getItem('id')
  }
  
}
