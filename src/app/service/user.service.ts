import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../class/user';
import { Login } from '../class/login';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpReq = {
  headers: new HttpHeaders({
    'Content-Type': 'aaplication/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private handleError: HandleError;
  private user = [];
  url:string = 'http://localhost:8000/api';

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) { 
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url+'/users', httpOptions)
    .pipe(
      catchError(this.handleError('getUsers', []))
    );
  }

  getUsersById(id:number): Observable<{}> {
    const nurl = `${this.url+'/user'}/${id}`;
    return this.http.get(nurl, httpOptions)
    .pipe(
      catchError(this.handleError('getUsersById'))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url+'/user', user, httpOptions)
    .pipe(
      catchError(this.handleError('addUser', user))
    );
  }

  deleteUser(id:number): Observable<{}> {
    const nurl = `${this.url+'/user'}/${id}`;
    return this.http.delete(nurl, httpOptions)
    .pipe(
      catchError(this.handleError('deleteUser'))
    );
  }

  updateUser(user: User, id: number) {
    const nurl = `${this.url+'/user'}/${id}`;
    return this.http.put(nurl, user,  httpOptions)
    .pipe(
      catchError(this.handleError('updateUser'))
    );
  }

  loginUsers(users: Login): Observable<any> {
    //console.log(users);
    return this.http.post<User>(this.url+'/login', users, httpOptions)
    .pipe(
      catchError(this.handleError('updateUser'))
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }
}
