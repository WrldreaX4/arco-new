import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { CreateformComponent } from './pages/createform/createform.component';
import { FlipbookComponent } from './pages/flipbook/flipbook.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportComponent } from './pages/report/report.component';
import { AnnualreportComponent } from './pages/forms/annualreport/annualreport.component';
import { FinancialreportComponent } from './pages/forms/financialreport/financialreport.component';
import { EventformComponent } from './pages/forms/eventform/eventform.component';
import { AnnualreportoutputComponent } from './pages/formsoutput/annualreportoutput/annualreportoutput.component';
import { EventreportoutputComponent } from './pages/formsoutput/eventreportoutput/eventreportoutput.component';
import { FinancialreportoutputComponent } from './pages/formsoutput/financialreportoutput/financialreportoutput.component';
import { EditeventreportComponent } from './pages/edit/editeventreport/editeventreport.component';
import { EditfinancialreportComponent } from './pages/edit/editfinancialreport/editfinancialreport.component';
import { EditannualreportComponent } from './pages/edit/editannualreport/editannualreport.component';
import { ProjectReportStatusComponent } from './pages/forms/projectreportstatus/projectreportstatus.component';
import { ProjectreportoutputComponent } from './pages/formsoutput/projectreportoutput/projectreportoutput.component';
import { EditprojectreportComponent } from './pages/edit/editprojectreport/editprojectreport.component';
import { UploadfilesComponent } from './pages/uploadfiles/uploadfiles.component';
import { ViewannualreportComponent } from './pages/view/viewannualreport/viewannualreport.component';
import { VieweventreportComponent } from './pages/view/vieweventreport/vieweventreport.component';
import { ViewfinancialrepertComponent } from './pages/view/viewfinancialrepert/viewfinancialrepert.component';
import { ViewprojectreportComponent } from './pages/view/viewprojectreport/viewprojectreport.component';
import { CollageComponent } from './pages/collage/collage.component';

export const routes: Routes = [

      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'app', children:[ { path: 'dashboard', component: DashboardComponent } ] },
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
        path: 'create/annualreport', 
        component: AnnualreportComponent
    },
    {
        path: 'create/annualreport/view', 
        component: AnnualreportoutputComponent
    },
    {
        path: 'create/financialreport/view', 
        component: FinancialreportoutputComponent
    },
    {
        path: 'create/eventreport', 
        component: EventformComponent 
    },  
    {
        path: 'create/eventreport/uploadmedia', 
        component: UploadfilesComponent
    },  
    {
        path: 'create/financialreport',  
        component: FinancialreportComponent
    },
    {
        path: 'create/projectreportstatus',
        component: ProjectReportStatusComponent
    },
    {
        path: 'summary/annualreport/view',  
        component: AnnualreportoutputComponent
    },   
    {
        path: 'create/eventreport/uploadmedia/view',  
        component: EventreportoutputComponent
    }, 
    {
        path: 'summary/eventreport/view/:id',  
        component: EventreportoutputComponent
    }, 
    {
        path: 'summary/financialreport/view/:id',  
        component: FinancialreportoutputComponent
    },
    {
        path: 'summary/projectreportstatus/view',  
        component: ProjectreportoutputComponent
    },
    {
        path: 'summary/eventreport/:id',        //dito done
        component: EditeventreportComponent
    },  
    {
        path: 'summary/financialreport/:id',           //dito done 
        component: EditfinancialreportComponent
    },
    {
        path: 'summary/annualreport/:id',      //dito           
        component: EditannualreportComponent
    }, 
    {
        path: 'summary/projectreportstatus/:id',      //dito           
        component: EditprojectreportComponent
    },
    {
        path: 'summary/vieweventreport/view/:id',        //dito done
        component: VieweventreportComponent
    },  
    {
        path: 'summary/viewfinancialreport/view/:id',           //dito done 
        component: ViewfinancialrepertComponent
    },
    {
        path: 'summary/viewannualreport/view/:id',      //dito           
        component: ViewannualreportComponent
    }, 
    {
        path: 'summary/viewprojectreport/view/:id',      //dito           
        component: ViewprojectreportComponent
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
    {
        path: 'collage',
        component: CollageComponent
    }
];