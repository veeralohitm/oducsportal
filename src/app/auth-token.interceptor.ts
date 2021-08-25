import { Params } from '@angular/router';
import { exhaustMap, take } from 'rxjs/operators';
import { LoginService } from './services/login.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.userSub.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        let modifiedReq = req.clone({
          params: req.params.append('auth', user.token || ''),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}