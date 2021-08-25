import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CactivateGuard implements CanActivate {
  constructor(public rtr : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
     {
    
    if(localStorage.getItem("userData") == null){
      this.rtr.navigate(["login"])
      return false;
    }
    else{
      return true;
    }
     
  }
  
}
