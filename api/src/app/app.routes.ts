import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { CreateformComponent } from './pages/createform/createform.component';
import { FlipbookComponent } from './pages/flipbook/flipbook.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportComponent } from './pages/report/report.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
       path: 'signup',
       component: SignupComponent
    },
    {
        path: 'dashboard', 
        component: DashboardComponent
    },
    {
        path: 'create', 
        component: CreateformComponent
    },    
    {
        path: 'summary', 
        component: SummaryComponent
    },    
    {
        path: 'flipbook', 
        component: FlipbookComponent
    },  
    {
        path: 'profile', 
        component: ProfileComponent
    },   
    {
        path: 'report', 
        component: ReportComponent
    },     
];
