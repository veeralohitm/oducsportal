import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../login/user.model';
import { BackendserviceService } from './backendservice.service';


export interface AuthResponseData {
  idToken: string;
  email: string;
  uname:string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  isLoggedIn = false;
  userSub = new BehaviorSubject<User | null >(null);
  clearTimeout: any;

  constructor(private http:HttpClient,public rtr : Router,) { }

  
  signUp(email: string, password: string, uname:string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA39R_TVuKm3RHOOj25tOrMQY3sQ_jviTA
    `,
        { email, password, uname, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

 





  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA39R_TVuKm3RHOOj25tOrMQY3sQ_jviTA
    `,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  private handleUser(response: AuthResponseData) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );
    const user = new User(
      response.email,
      response.uname,
      response.localId,
      response.idToken,
      expireDate
    );
  this.userSub.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
   this.autoLogout(+response.expiresIn * 1000);
  }

  
  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
    }
    return throwError(errorMessage);
  }

  logout() {
    this.userSub.next(null);
    this.rtr.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  autoLogin() {
    let userData: {
      email: string;
      uname:string;
      _token: string;
      expirationDate: string;
      localId: string;
    } = JSON.parse(localStorage.getItem('userData') || '');
    if (!userData) {
      return;
    }

    let user = new User(
      userData.email,
      userData.uname,
      userData.localId,
      userData._token,
      new Date(userData.expirationDate)
    );

    if (user.token) {
      this.userSub.next(user);
    }

    let date = new Date().getTime();
    let expirationDate = new Date(userData.expirationDate).getTime();

    this.autoLogout(expirationDate - date);
  }

  autoLogout(expirationDate: number) {
    console.log(expirationDate);
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

}
