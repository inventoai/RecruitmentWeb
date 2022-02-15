import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  managerId;
  leadId;
  recruiterId;
  employeeId;
  employeeName;
  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    var auth = JSON.parse(localStorage.getItem("approvedCredential"));
    console.log(auth.loginType);
    if (auth.loginType == "Recruiter") {
      this.managerId = document.getElementById("manager");
      this.managerId.style.display = "none";
      this.leadId = document.getElementById("teamLead");
      this.leadId.style.display = "none";
      console.log(auth)
      console.log(auth._employeeId)
      this.employeeId = auth._employeeId;

      this.employeeName = auth.employee;
      console.log("Recruiter only");
    }
    else if (auth.loginType == "Team Lead") {
      this.managerId = document.getElementById("manager");
      this.managerId.style.display = "none";
      this.recruiterId = document.getElementById("recruiter");
      this.recruiterId.style.display = "none";
      console.log("Team only");
    }
    else if (auth.loginType == "Manager") {
      this.recruiterId = document.getElementById("recruiter");
      this.recruiterId.style.display = "none";
      this.leadId = document.getElementById("teamLead");
      this.leadId.style.display = "none";
      console.log("Manage");
    }
    var _id = auth.adminId;
    console.log(_id);
  }


  logOut() {
    // this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    localStorage.removeItem("credential");
    var auth = JSON.parse(localStorage.getItem("credential"));
    this.router.navigate(["/login"]);
    console.log(auth);
    console.log("Log out");
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
