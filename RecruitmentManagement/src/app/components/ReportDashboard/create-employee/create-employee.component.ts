import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employeeForm } from '../models/employeeModel';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadResumeComponent } from '../../forms/upload-resume/upload-resume.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { UploadProfileService } from 'src/app/services/upload-profile.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  submitted = false;
  employee = employeeForm;
  uploadForm: FormGroup;

  constructor(private router: Router, private employeeService: EmployeeService, private location: Location,
    private fb: FormBuilder, private uploadFileService: UploadProfileService) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      docFile: [''],
      photoFile: ['']
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.employee);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    const formdata = new FormData;
    formdata.append('docFile', this.uploadForm.get('docFile').value);
    formdata.append('photoFile', this.uploadForm.get('photoFile').value);
    formdata.append("jsonData", JSON.stringify(this.employee));
    console.log(formdata)
    this.employeeService
      .createEmployee(formdata).subscribe(data => {
        console.log(data)
        this.gotoHome();
      },
        error => console.log(error));
  }
  gotoHome() {
    this.router.navigate(['/default/employeelist'])
  }
  cancel() {
    this.location.back();
  }
  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const doc = event.target.files[0];
      this.uploadForm.get('docFile').setValue(doc);
    }
    // this.onExtrctingDoc()
  }

  // onExtrctingPhoto() {
  //   const formData = new FormData();
  //   formData.append('file', this.uploadForm.get('globalFile').value);
  //   this.uploadFileService.getBinaryFile(formData).subscribe(data => {
  //     this.employee.photo = JSON.stringify(data);
  //     console.log(data);
  //     console.log(this.employee.photo);
  //   },
  //     error => console.log(error));
  // }


  onPhotoSelect(event) {
    if (event.target.files.length > 0) {
      const photo = event.target.files[0];
      this.uploadForm.get('photoFile').setValue(photo);
    }
    // this.onExtrctingPhoto()
  }


}