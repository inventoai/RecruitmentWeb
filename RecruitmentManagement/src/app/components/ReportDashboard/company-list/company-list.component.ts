import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Company } from '../models/employeeModel';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Observable<Company[]>;
  searchText;
  isLoading = true;
  dataSource = null;
  constructor(private router: Router, private companyService: EmployeeService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.companyService.getCompanyList().subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
      console.log(data);
    });
  }

  deleteCompany(_id: string) {
    alert("Pending")
  }
  updateCompany(id: string) {
    alert("Pending")
    // this.router.navigate(['/employeedetail', id]);
  }
  companyDetail(_id: string) {
    alert("Pending");
    // this.router.navigate(['/employeedetail', _id]);
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
