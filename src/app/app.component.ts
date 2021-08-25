import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cportal';

  constructor(
    private authService: LoginService,
  
  ) {}

  ngOnInit() {
    this.authService.autoLogin();
   
  }
  



}

