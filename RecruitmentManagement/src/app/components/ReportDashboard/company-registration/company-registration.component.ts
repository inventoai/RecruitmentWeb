import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { companyJson, Locations } from '../models/companyModel';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  @ViewChild('select') select: MatSelect;

  submitted = false;
  locations = Locations;
  company = companyJson;
  allSelected;
  companyForm: FormGroup
  constructor(private router: Router, private employeeService: EmployeeService, private _location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.companyForm = this.fb.group({
      docFile: ""
    });
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.company);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    const formData = new FormData;
    formData.append("docFile", this.companyForm.get("docFile").value);
    formData.append("companyFormJson", JSON.stringify(this.company));
    this.employeeService
      .registerCompany(formData).subscribe(data => {
        console.log(data)
        this.gotoHome();
      },
        error => console.log(error));
  }
  gotoHome() {
    this.router.navigate(['default/companylist'])
  }
  cancel() {
    this._location.back();
  }


  toggleAllSelection() {
    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  optionClick() {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
      }
    });
    this.allSelected = newStatus;
  }
  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.size);
      this.companyForm.get("docFile").setValue(file);
    }
  }

}
