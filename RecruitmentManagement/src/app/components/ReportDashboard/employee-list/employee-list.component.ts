import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Client, Company, Employee } from '../models/employeeModel';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employees: Observable<Employee[]>;
  companies: Observable<Company[]>;
  clients: Observable<Client[]>
  searchText;
  isLoading = true;
  dataSource = null;
  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
    });
  }


  deleteEmployee(_id: string) {
    // this.employeeService.deleteEmployee(_id)
    //   .subscribe(
    //     data => {
    //       console.log(data);
    //       this.reloadData();
    //     },
    //     error => console.log(error));
    alert("Pending.")
  }

  updateEmployee(id: string) {
    alert("Pending.")
    // this.router.navigate(['/employeedetail', id]);
  }
  employeeDetail(_id: string) {
    alert("Pending.")
    // this.router.navigate(['/default/employeedetail', _id]);
  }


  employeeId(name, file) {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `${name}.docx`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }
  corporatePresentation(name, file) {
    const linkSource = `data:application/pdf;base64,${file}`;
    const downloadLink = document.createElement("a");
    const fileName = `${name}.docx`;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
