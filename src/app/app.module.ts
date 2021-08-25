import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule,routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoginService} from './services/login.service';

import {FormsModule} from '@angular/forms';
import { AuthTokenInterceptor } from './auth-token.interceptor';
import { AskinstructorComponent } from './askinstructor/askinstructor.component';

// Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { LectureComponent } from './lecture/lecture.component';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    AboutComponent,
    AskinstructorComponent,    
    DashboardComponent,
    ProfileComponent,
    LectureComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),   

    
  ],
  providers: [  
      
    AuthTokenInterceptor,  
    LoginService 
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
