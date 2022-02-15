import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { Resume, resumeJson } from '../../ReportDashboard/models/resume';
import { Experiance, NoticePeriod } from '../../shared/model1';

@Component({
  selector: 'app-upload-resume',
  templateUrl: './upload-resume.component.html',
  styleUrls: ['./upload-resume.component.scss']
})
export class UploadResumeComponent implements OnInit {

  uploadForm: FormGroup;
  submitted = false;
  resumeData = resumeJson;
  experiance = Experiance;
  noticePeriod = NoticePeriod;
  todayNumber: number = Date.now();
  todayDate: Date = new Date();
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();

  constructor(private fb: FormBuilder, private router: Router, private uploadProfileService: UploadProfileService,
    private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      profile: ['']
    });
  }
  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    this.onExtrctingData()
  }

  onExtrctingData() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.uploadProfileService.getResumeDetail(formData).subscribe(data => {
      this.resumeData = data;
      console.log(data);
      console.log(this.resumeData);
    },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.resumeData);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    this.resumeData.openingId = this.route.snapshot.params['_id'];
    this.resumeData.recruiterId = this.route.snapshot.params['recruiterId'];
    this.resumeData.slot = this.route.snapshot.params['slot'];
    this.resumeData.workAllocationId = this.route.snapshot.params['workAllocation'];

    const formdata = new FormData;
    formdata.append('docFile', this.uploadForm.get('profile').value);
    formdata.append("jsonData", JSON.stringify(this.resumeData));
    this.uploadProfileService
      .uploadProfile(formdata).subscribe(data => {
        console.log(data)
        this.gotoHome();
      },
        error => console.log(error));
  }
  gotoHome() {
    var employeeName = JSON.parse(localStorage.getItem("approvedCredential")).employee;
    this.router.navigate(['/default/dailyworkreport', employeeName, 'detail', this.resumeData.recruiterId])
  }

  cancel() {
    this._location.back();
  }

}
