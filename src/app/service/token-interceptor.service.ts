import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let userToken = this.injector.get(UserService);
    //console.log(userToken.getToken())
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
