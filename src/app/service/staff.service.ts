import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { GlobalService } from '../global.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { ModelInterval } from 'src/app/class/model-interval';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private handleError: HandleError;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler, public global: GlobalService, private userservice: UserService) { this.handleError = httpErrorHandler.createHandleError('StaffService'); }

  storeService(model: ModelInterval): Observable<ModelInterval> {
    return this.http.post<ModelInterval>(this.global.url + '/item', model, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).pipe(catchError(this.handleError('modelInterval', model)))
  }

  listCar(): Observable<ModelInterval[]> {
    return this.http.get<ModelInterval[]>(this.global.url+'/list', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.global.token()}`
      })
    }).pipe(catchError(this.handleError('listCar', [])));
  }
}
