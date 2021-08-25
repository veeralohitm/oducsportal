import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, LoginService } from '../services/login.service';

import { NavbarComponent } from '../navbar/navbar.component'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService : LoginService,public rtr : Router,) { }

  ngOnInit(): void {
  }


isLoginMode = true;
error : string = "";

onSwitchMode(){
  this.isLoginMode = !this.isLoginMode;
}
onFormSubmit(authForm: NgForm){
  console.log(authForm.value);
  if(!authForm.valid){
    return;
  }
  let authObs: Observable<AuthResponseData>;
  
  if (this.isLoginMode) {
    authObs = this.authService.login(
      authForm.value.email,
      authForm.value.password
      
    );
  } else {
    authObs = this.authService.signUp(
      authForm.value.email,
      authForm.value.password,
      authForm.value.uname
    );
  }

  authObs.subscribe(
    (response) => {
      console.log(response); 
  
        this.rtr.navigate(['home']);
     
     
    },
    (errorMessage) => {
      this.error = errorMessage;
         
    }
  );
}

}


