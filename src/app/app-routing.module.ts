import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CactivateGuard } from './cactivate.guard';
import { AskinstructorComponent } from './askinstructor/askinstructor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LectureComponent } from './lecture/lecture.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent,canActivate:[CactivateGuard]},
  { path: 'about', component: AboutComponent,canActivate:[CactivateGuard]},
  { path: 'ask', component: AskinstructorComponent,canActivate:[CactivateGuard]},
  { path: 'dashboard', component: DashboardComponent,canActivate:[CactivateGuard]},
  { path: 'editpost/:id', component: DashboardComponent,canActivate:[CactivateGuard] },
  { path: 'profile', component: ProfileComponent,canActivate:[CactivateGuard] },
  { path: 'lecture', component: LectureComponent,canActivate:[CactivateGuard] },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =[LoginComponent, 
  HomeComponent, AboutComponent, 
  AskinstructorComponent,  
  DashboardComponent,
  ProfileComponent,
  LectureComponent
]
