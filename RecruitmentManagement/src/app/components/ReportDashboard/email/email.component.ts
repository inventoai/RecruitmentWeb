import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { FormModel } from '../models/resume';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  public formModel: FormModel = {};
  // formModel = EmailForm;
  uploadForm: FormGroup;
  public separatorKeysCodes = [ENTER, COMMA];
  public emailList = [];
  public emailList2 = [];
  removable = true;
  rulesForm: FormGroup;
  ccEmails = [];
  bccEmails = [];

  constructor(private dialogRef: MatDialogRef<EmailComponent>, private emailService: UploadProfileService, private fb: FormBuilder,
    private uploadProfileService: UploadProfileService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.formModel.senderEmail = JSON.parse(localStorage.getItem("approvedCredential")).officeEmailId;
    this.formModel.candidateMail = this.data.candidateEmailId;
    console.log(this.data.candidateEmailIdId);
    this.uploadForm = this.fb.group({
      resumeFile: ['']
    });

    this.rulesForm = this.fb.group({
      emails: this.fb.array([], [this.validateArrayNotEmpty]),
    });
  }



  onDocSelect(event) {
    if (event.target.files.length > 0) {
      const doc = event.target.files[0];
      this.uploadForm.get('resumeFile').setValue(doc);
    }
    // this.onExtrctingDoc()
  }

  add(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value)) {
        this.emailList.push({ value: event.value, invalid: false });
        this.ccEmails.push(event.value);
      }
      else {
        this.emailList.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }
  add1(event): void {
    console.log(event.value)
    if (event.value) {
      if (this.validateEmail(event.value)) {
        this.emailList2.push({ value: event.value, invalid: false });
        this.bccEmails.push(event.value);
      }
      else {
        this.emailList2.push({ value: event.value, invalid: true });
        this.rulesForm.controls['emails'].setErrors({ 'incorrectEmail': true });
      }
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList.indexOf(data) >= 0) {
      this.emailList.splice(this.emailList.indexOf(data), 1);
    }
  }

  removeEmail2(data: any): void {
    console.log('Removing ' + data)
    if (this.emailList2.indexOf(data) >= 0) {
      this.emailList2.splice(this.emailList2.indexOf(data), 1);
    }
  }


  private validateArrayNotEmpty(c: FormControl) {
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }
    return null;
  }

  private validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }



  onSubmit() {
    console.log('Email:', this.formModel);
    this.send();
    this.dialogRef.close();
    //this.openingForm.reset();

  }

  send() {
    const formdata = new FormData;
    formdata.append('resumeFile', this.uploadForm.get('resumeFile').value);
    formdata.append('ccEmails', JSON.stringify(this.ccEmails));
    formdata.append('bccEmails', JSON.stringify(this.bccEmails));
    formdata.append("jsonData", JSON.stringify(this.formModel));
    console.log(formdata)
    console.log(this.formModel);
    console.log(this.ccEmails);
    console.log(this.bccEmails);
    this.emailService
      .sentMail(formdata).subscribe(data => {
        console.log(data);
        console.log("CandidateId : " + this.data.candidateID);
        const formdata1 = new FormData;
        formdata1.append("sharedProfileId", this.data.candidateID)
        console.log("form data: " + formdata1)
        this.uploadProfileService.sharedProfile(formdata1).subscribe(data => {
          console.log(data);
        },
          err => alert("Something went wrong. Please try again !"));
      },
        // error => console.log(error));
        err => alert("Something went wrong. Please try again !"));
  }

  handleSuccess(e) {
    // console.log("ReCaptcha", e);
    console.log("ReCaptcha is working.");
  }



}
