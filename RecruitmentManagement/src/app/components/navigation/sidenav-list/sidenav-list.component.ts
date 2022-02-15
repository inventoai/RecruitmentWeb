import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();


  public appComponents = [];

  logo;
  isLoading = false;
  employeeId;
  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.logo = "assets/images/IzeetekLogo.png"
    var auth = JSON.parse(localStorage.getItem("approvedCredential"));
    console.log(auth.loginType);
    if (auth.loginType == "Recruiter") {
      this.employeeId = auth._employeeId;
      this.appComponents.push({ title: 'Upload Profile', url: "['/default/employeedetail', employeeId]", icon: 'create' },
        { title: 'Profile status', url: "['/default/dailyworkreport', employeeName, 'detail', employeeId]", icon: "group_work" });
    }
    else if (auth.loginType == "Team Lead") {
      this.appComponents.push({ title: 'Create Opening', url: '/default/createopening', icon: 'create' },
        { title: 'Work Allocation', url: '/default/workallocation', icon: "group_work" },
        { title: 'Requirement Report', url: '/default/openingprofilereport', icon: "report" });
    }
    else if (auth.loginType == "Manager") {
      this.appComponents.push({ title: 'Company List', url: '/default/companylist', icon: 'create' },
        { title: 'Client List', url: '/default/clientlist', icon: "group_work" },
        { title: 'Employee List', url: '/default/employeelist', icon: "report" });
    }
    var _id = auth.adminId;
    console.log(_id);
  }

  openLoginForm() {
    this.sidenavClose.emit();
    this.dialog.open(LoginComponent, { width: '500px', height: '450px' });
    console.log("Opened");
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  async logOut() {
    this.isLoading = true;
    setTimeout(() => {
      localStorage.removeItem("credential");
      var auth = JSON.parse(localStorage.getItem("credential"));
      this.router.navigate(["/login"]);
      console.log(auth);
      this.isLoading = false;
    }, 1000);
  }

}
