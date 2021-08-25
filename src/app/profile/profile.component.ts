import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../services/login.service';
import { BackendserviceService } from '../services/backendservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  authState: any = null;
  error: boolean = false;
  errorMessage: String = "";
  savedChanges: boolean = false;
  newUser: boolean = false;
  data$:any;
  userdata:any;
  dataLoading: boolean = false;
  useremail:any = null;

  constructor(public authService: LoginService,private _backendService: BackendserviceService, public rtr : Router) { }

  ngOnInit(): void {
    this.authService.userSub.subscribe((user) => {      
      this.authState = user?.localId;
      this.useremail = user?.email;
      console.log(this.authState);  
      this.getUserDoc();    
      });    
    
  }

  onSubmit_newuser(formData:any) { 
    formData.email = this.useremail;   
    formData.role='student';
    this._backendService.setUserDoc("USERS", this.authState, formData)
      .then(
        res => {
          if (res) {
            this.savedChanges = true;
            this.errorMessage = "Changes are saved";
            this.rtr.navigate(['home']);            
          }
        })
      .catch(e => {
        if (e) {
          this.error = true;
          this.errorMessage = e.message;          
        }
      });
  }
  getUserDoc() {    
    return this._backendService.getDoc("USERS", this.authState).subscribe(
      (res: any) => {
        if (res) {
          this.data$ = res;         
          console.log(res);
          localStorage.setItem('username',res.name);
        } else {
          this.newUser = true;
        }
        
      },
      (      error: String) => {
        this.newUser = true;
        this.error = true;
        this.errorMessage = error;       
      },
      () => this.dataLoading = false
    );
  }
  onSubmit_update(formData:any) {
    this.dataLoading = true;
    this._backendService.updateDoc("USERS", this.authState, formData)
      .then(
        (        res: any) => {
          if (res) {
            this.savedChanges = true;
            this.errorMessage = "Changes are saved";
            this.dataLoading = false;
            this.rtr.navigate(['home']); 
          }
        })
      .catch((e: { message: String; }) => {
        if (e) {
          this.error = true;
          this.errorMessage = e.message;
          this.dataLoading = false;
        }
      });
  }

}

