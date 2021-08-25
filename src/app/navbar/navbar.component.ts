import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendserviceService } from '../services/backendservice.service';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuthenticated = false;
  constructor(public authService : LoginService, public rtr : Router,public _backendService:BackendserviceService) { 

   
        
  }
  userdetails:any; 
  isAdmin = true;
  data$:any = localStorage.getItem('roles');

  ngOnInit() {
    this.authService.userSub.subscribe((user) => {
      console.log(user);
      this.userdetails = user;     
   
    this.getUserDoc();
   
      });    
  }

  onLogout(event: Event) {
    localStorage.clear();
    
    this.authService.logout();
  }

  getUserDoc() {
   
    return this._backendService.getDoc("USERS", this.userdetails.localId).subscribe(
      (res:any) => {
       console.log(res);
        if (res) {
        this._backendService.getDoc("ROLES", res["role"]).subscribe(
            (res2:any) => {
              console.log(res2);
              this.data$ = res2;
              console.log(this.data$.student.visible);
              
            }
          )             
        }
      },
      error => {},
      () => console.log("errrrr")
    );
  }


}

