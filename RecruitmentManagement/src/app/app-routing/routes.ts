import { Routes } from '@angular/router';
import { CandidateListComponent } from '../components/candidate-list/candidate-list.component';
import { DefaultComponent } from '../components/default/default.component';
import { CreateOpeningComponent } from '../components/forms/create-opening/create-opening.component';
import { UploadResumeComponent } from '../components/forms/upload-resume/upload-resume.component';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { ActiveOpeningComponent } from '../components/Opening/active-opening/active-opening.component';
import { ApprovedProfileComponent } from '../components/Opening/approved-profile/approved-profile.component';
import { RejectedProfilesComponent } from '../components/Opening/rejected-profiles/rejected-profiles.component';
import { WorkAllocationComponent } from '../components/Opening/work-allocation/work-allocation.component';
import { ClientListComponent } from '../components/ReportDashboard/client-list/client-list.component';
import { ClientRegistrationComponent } from '../components/ReportDashboard/client-registration/client-registration.component';
import { CompanyListComponent } from '../components/ReportDashboard/company-list/company-list.component';
import { CompanyRegistrationComponent } from '../components/ReportDashboard/company-registration/company-registration.component';
import { CreateEmployeeComponent } from '../components/ReportDashboard/create-employee/create-employee.component';
import { DailyWorkReportComponent } from '../components/ReportDashboard/daily-work-report/daily-work-report.component';
import { EmployeeDetailComponent } from '../components/ReportDashboard/employee-detail/employee-detail.component';
import { EmployeeListComponent } from '../components/ReportDashboard/employee-list/employee-list.component';
import { OpeningProfileReportComponent } from '../components/ReportDashboard/opening-profile-report/opening-profile-report.component';





export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'default', component: DefaultComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'candidatelist/:_id', component: CandidateListComponent },
            { path: 'createopening', component: CreateOpeningComponent },
            { path: 'employeelist', component: EmployeeListComponent },
            { path: 'companylist', component: CompanyListComponent },
            { path: 'createemployee', component: CreateEmployeeComponent },
            { path: 'employeedetail/:_id', component: EmployeeDetailComponent },
            { path: 'dailyworkreport/:_id/detail/:recruiterId', component: DailyWorkReportComponent },
            // { path: 'dailyworkreport/:_id', component: DailyWorkReportComponent },
            { path: 'companyregistration', component: CompanyRegistrationComponent },
            { path: 'uploadresume/:_id/work/:recruiterId/timing/:slot/allocation/:workAllocation', component: UploadResumeComponent },
            { path: 'clientregistration', component: ClientRegistrationComponent },
            { path: 'clientlist', component: ClientListComponent },
            { path: 'workallocation', component: WorkAllocationComponent },
            { path: 'activeopening/:_id', component: ActiveOpeningComponent },
            { path: 'openingprofilereport', component: OpeningProfileReportComponent },
            { path: 'approvedprofile/:id', component: ApprovedProfileComponent },
            { path: 'rejectedprofile/:id', component: RejectedProfilesComponent }
        ]

    },



]