import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private handleError: HandleError;
  constructor
    (
      private http: HttpClient,
      httpErrorHandler: HttpErrorHandler,
      public global: GlobalService,
      private userservice: UserService
    ) { this.handleError = httpErrorHandler.createHandleError('StaffService'); }

  getServiceByPlateNum(plateNum: string): Observable<{}> {
    const nurl = `${this.global.url + '/service'}/${plateNum}`;
    return this.http.get(nurl, 
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.global.token()}`
        })
    }).pipe
      (catchError(this.handleError('getServiceByPlateNum')))
  }
}
