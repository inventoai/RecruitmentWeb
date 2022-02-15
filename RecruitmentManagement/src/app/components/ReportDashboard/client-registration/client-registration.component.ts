import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Locations } from '../models/companyModel';
import { Company, CompanyList } from '../models/employeeModel';

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent implements OnInit {


  submitted = false;

  client = {
    companyName: '',
    clientName: '',
    clientURL: '',
    corporatePresentation: '',
    branches: '',
    remarks: ''
  };
  location = Locations;
  companies: Observable<CompanyList[]>;
  clientForm: FormGroup;

  constructor(private router: Router, private clientService: EmployeeService, private _location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.clientService.getCompanyList().subscribe(data => {
      this.companies = data;
      console.log(data);
    });

    this.clientForm = this.fb.group({
      docFile: ""
    });
  }


  onSubmit() {
    this.submitted = true;
    console.log(this.client);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    this.clientService
      .registerClient(this.client).subscribe(data => {
        console.log(data)
        this.gotoHome();
      },
        error => console.log(error));
  }
  gotoHome() {
    this.router.navigate(['/default/clientlist'])
  }
  cancel() {
    this._location.back();
  }


  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file.size);
      this.clientForm.get("docFile").setValue(file);
    }
  }


}
