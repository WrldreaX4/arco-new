import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';

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
        path: '', // Route for the dashboard component
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
