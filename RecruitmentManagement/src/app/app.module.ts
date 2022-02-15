import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing/app-routing.module';
import { NgMultiSelectDropDownModule } from 'ng-multiSelect-dropDown';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';

import { NgxDocViewerModule } from 'ngx-doc-viewer';



import { AppComponent } from './app.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CreateOpeningComponent } from './components/forms/create-opening/create-opening.component';
import { UploadResumeComponent } from './components/forms/upload-resume/upload-resume.component';
import { HomeComponent } from './components/home/home.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEmployeeComponent } from './components/ReportDashboard/create-employee/create-employee.component';
import { EmployeeListComponent } from './components/ReportDashboard/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './components/ReportDashboard/employee-detail/employee-detail.component';
import { CompanyRegistrationComponent } from './components/ReportDashboard/company-registration/company-registration.component';
import { ClientRegistrationComponent } from './components/ReportDashboard/client-registration/client-registration.component';
import { EmailComponent } from './components/ReportDashboard/email/email.component';
import { ActiveOpeningComponent } from './components/Opening/active-opening/active-opening.component';
import { WorkAllocationComponent } from './components/Opening/work-allocation/work-allocation.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { CompanyListComponent } from './components/ReportDashboard/company-list/company-list.component';
import { DailyWorkReportComponent } from './components/ReportDashboard/daily-work-report/daily-work-report.component';
import { ClientListComponent } from './components/ReportDashboard/client-list/client-list.component';
import { DefaultComponent } from './components/default/default.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { OpeningProfileReportComponent } from './components/ReportDashboard/opening-profile-report/opening-profile-report.component';
import { ApprovedProfileComponent } from './components/Opening/approved-profile/approved-profile.component';
import { RejectedProfilesComponent } from './components/Opening/rejected-profiles/rejected-profiles.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    CreateOpeningComponent,
    UploadResumeComponent,
    HomeComponent,
    CandidateListComponent,
    LoginComponent,
    CreateEmployeeComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    CompanyRegistrationComponent,
    ClientRegistrationComponent,
    EmailComponent,
    ActiveOpeningComponent,
    WorkAllocationComponent,
    SidenavListComponent,
    CompanyListComponent,
    DailyWorkReportComponent,
    ClientListComponent,
    DefaultComponent,
    OpeningProfileReportComponent,
    ApprovedProfileComponent,
    RejectedProfilesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FlexLayoutModule,
    RouterModule,
    AppRoutingModule,
    NgMultiSelectDropDownModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatChipsModule,
    MatAutocompleteModule,
    MaterialFileInputModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    NgxCaptchaModule,
    NgxDocViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
