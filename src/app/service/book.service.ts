import { Injectable } from '@angular/core';
import { Book } from 'src/app/class/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private handleError: HandleError;
  private book = [];
  //url: string = 'http://192.168.0.112:8000/api';
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, public global: GlobalService) {
    this.handleError = httpErrorHandler.createHandleError('BookService');
  }

  getToken() {
    return sessionStorage.getItem('token')
  }

  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.global.url + '/book', book,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
      })
      .pipe(
        catchError(this.handleError('add', book))
      );
  }

  list(date: string): Observable<Book[]> {
    const nurl = `${this.global.url+'/date'}/${date}`
    return this.http.get<Book[]>(nurl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
      }).pipe(
        catchError(this.handleError('list', []))
      )
  }

  listbyid(id: number): Observable<{}> {
    const nurl = `${this.global.url + '/book'}/${id}`;
    return this.http.get(nurl,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`,
          'Accept': 'application/json'
        })
      }).pipe(
        catchError(this.handleError('listbyid'))
      )
  }

  deletebyplateNo(plateNum: string): Observable<{}> {
    const nurl = `${this.global.url + '/book'}/${plateNum}`;
    return this.http.delete(nurl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).pipe(catchError(this.handleError('deletebyplateNo')))
  }

  availableHours(): Observable<{}> {
    return this.http.get(this.global.url+'/availableHours', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`,
        'Accept': 'application/json'
      })
    }).pipe(catchError(this.handleError('availableHours')))
  }
}