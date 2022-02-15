import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  user = { loginType: '', userName: '', password: '' };
  loginForm;
  isLoading = false;

  // constructor(private dialogRef: MatDialogRef<LoginComponent>, private fb: FormBuilder) { }

  constructor(private fb: FormBuilder, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {

  }

  onSubmit() {
    this.isLoading = true;
    console.log('User:', this.user);
    localStorage.setItem("loginCredential", JSON.stringify(this.user));
    this.employeeService.loginEmployee(this.user).subscribe(data => {
      localStorage.setItem("approvedCredential", JSON.stringify(data));
      this.isLoading = false;
      this.router.navigate(["/default"]);
    },
      err => alert("Invalid credentials. Please try again"));
  }

}