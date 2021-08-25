import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendserviceService } from '../services/backendservice.service';
import { LoginService } from '../services/login.service';
import { UpdateService } from '../services/update.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  userdetails:any;
  posts: any[] = [];
  data$:any;
  username: string | undefined;

  
  constructor(private _updateService: UpdateService,public authService : LoginService,public _backendService:BackendserviceService,
    public rtr : Router) {
     
   }

  ngOnInit(): void {      
    this.authService.userSub.subscribe((user) => {
      console.log(user);
      this.userdetails = user; 
      this.getUserDoc(); 
    
    });
      
     this.getPosts(); 
     
    
    
  }

  getPosts() {
    this._updateService.getposts().subscribe(data => {
      this.posts = [];
      data.forEach((element: any) => {
        this.posts.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.posts);
    });
  }
  getUserDoc() {
   
    return this._backendService.getDoc("USERS", this.userdetails.localId).subscribe(
      (res:any) => {
        if(res === undefined){
          this.rtr.navigate(['profile']);
        }       
               
       console.log(res);
        this.username = res.name;   
        
               
        this._backendService.getDoc("ROLES", res["role"]).subscribe(
            (res2:any) => {
              console.log(res2);
              this.data$ = res2;             
              this._backendService.setRole(this.data$);
            }
          )             
      
       },
      error => {},
      () =>  console.log('errr')
    );
  }
}