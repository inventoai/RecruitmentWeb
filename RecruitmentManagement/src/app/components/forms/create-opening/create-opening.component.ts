import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyList, openingForm } from '../../ReportDashboard/models/employeeModel';
import { Experiance, NoticePeriod, Questions, skillSets } from '../../shared/model1';
import { IDropdownSettings, } from 'ng-multiselect-dropdown';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/employee.service';
import { OpeningService } from 'src/app/services/opening.service';
import { Locations } from '../../ReportDashboard/models/companyModel';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-create-opening',
  templateUrl: './create-opening.component.html',
  styleUrls: ['./create-opening.component.scss']
})
export class CreateOpeningComponent implements OnInit {

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('select') select: MatSelect;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();
  filteredSkills: Observable<string[]>;
  skills: string[] = [];
  allSkills: string[] = skillSets;
  uploadSample: FormGroup;
  allSelected = false;
  submitted = false;
  experiances = Experiance;
  roleValue;
  noticePeriods = NoticePeriod;
  questions = Questions;
  companies: Observable<CompanyList>;
  companyName;
  clients;
  contractId: any;
  clientBlockId: any;
  chkYes: any;
  dvtext: any;
  chkYes1: any;
  dvtext1: any;
  dvtext2: any;
  opening = openingForm;
  dropdownSettings: IDropdownSettings = {};
  selectedQuestion = { question: '' };
  selectedQuestions = [];
  todayNumber: number = Date.now();
  todayDate: Date = new Date();
  todayString: string = new Date().toDateString();
  todayISOString: string = new Date().toISOString();
  location = Locations;
  subDomainlList = [];
  subDomains = [];
  domainForm: FormGroup;
  domains: Observable<any>;
  roles: any;
  locationForm: FormGroup;

  constructor(private router: Router, private openingService: OpeningService, private _location: Location, private generalService: GeneralService,
    private employeeService: EmployeeService, private fb: FormBuilder) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }

  ngOnInit(): void {
    this.employeeService.getCompanyList().subscribe(data => {
      this.companies = data;
      console.log(data);
    });
    this.domainForm = this.fb.group({
      domain: ['']
    });

    this.locationForm = this.fb.group({
      location: ['']
    });

    this.reloadDomain();
  }

  reloadDomain() {
    this.generalService.getDomains().subscribe(data => {
      this.domains = data;
      console.log(this.domains);
    },
      err => console.log(err));
  }

  companyClients(value) {
    this.employeeService.getClientList().subscribe(data => {
      console.log(data);
      var arr = [];
      for (var val of data) {
        if (value == val.companyName) {
          arr.push(val);
          console.log("matched");
          console.log(val);
        }
        else {
          this.clients = null;
        }
      }
      console.log(arr);
      this.clients = arr;
      console.log(this.clients.length);
      this.clientBlockId = document.getElementById("clientBlockId");
      if (this.clients.length > 0) {
        this.clientBlockId.style.display = "block";
      }
      else {
        this.opening.clientName = '';
        this.clientBlockId.style.display = "none";
      }
    });

    this.dropdownSettings = {
      textField: 'clientName'
    };
  }

  contract(employeeTypeValue) {
    console.log(employeeTypeValue);
    this.contractId = document.getElementById("contractId");
    if (employeeTypeValue == "Contract") {
      this.contractId.style.display = "block";
      console.log("working");
    }
    else {
      this.contractId.style.display = "none";
    }
  }

  async domailRoles(_id) {
    this.generalService.getSubDomains(_id).subscribe(data => {
      this.roles = JSON.parse(data);
      console.log(this.roles);
    },
      err => console.log(err));
  }


  ShowHideDiv() {
    this.chkYes = document.getElementById("chkYes");
    this.dvtext = document.getElementById("dvtext");
    this.dvtext.style.display = this.chkYes.checked ? "block" : "none";
  }

  ShowHideDiv1() {
    this.chkYes1 = document.getElementById("chkYes1");
    this.dvtext1 = document.getElementById("dvtext1");
    this.dvtext1.style.display = this.chkYes1.checked ? "block" : "none";
    if (this.dvtext1.style.display == "none") {
      this.opening.questions = Array[''];
      this.dvtext2 = document.getElementById("dvtext2");
      this.dvtext2.style.display = "none";
    }
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

  addQuestion(ques) {
    console.log(ques);
    console.log("question added");
    this.selectedQuestions.push(ques);
    this.opening.questions = this.selectedQuestions
    console.log("array:" + this.selectedQuestions);
    this.dvtext2 = document.getElementById("dvtext2");
    this.dvtext2.style = "block";
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our skill
    if (value) {
      this.skills.push(value);
      this.opening.mandatorySkills.push(value);
      console.log("accha==" + this.opening.mandatorySkills);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.skillCtrl.setValue(null);
  }

  remove(skill: string): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.skills.push(event.option.viewValue);
    this.opening.mandatorySkills = this.skills;
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSkills.filter(skill => skill.toLowerCase().includes(filterValue));
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    this.save();
    //this.openingForm.reset();
  }

  save() {
    console.log(this.opening);
    this.openingService
      .createOpening(this.opening).subscribe(data => {
        console.log(data);
        this.submitted = true;
        this.gotoHome();
      },
        error => alert("Something went wrong. Please try later !"));
  }

  gotoHome() {
    this.router.navigate(['default/workallocation']);
  }
  cancel() {
    this._location.back();
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }
  addDomain() {
    var openingFormId = document.getElementById("openingForm");
    openingFormId.style.display = "none";
    var domainFormId = document.getElementById("domainForm");
    domainFormId.style.display = "block";
  }
  submitDomain() {
    console.log("FormValue ::::" + this.domainForm.get('domain').value + JSON.stringify(this.domainForm.value));
    var formData = new FormData;
    formData.append("domainJson", JSON.stringify(this.domainForm.value));
    formData.append("subDomain", JSON.stringify(this.subDomains));
    this.generalService.addDomain(formData).subscribe(data => {
      console.log(data);
      var openingFormId = document.getElementById("openingForm");
      openingFormId.style.display = "block";
      var domainFormId = document.getElementById("domainForm");
      domainFormId.style.display = "none";
      this.domainForm.reset();
      this.subDomains = [];
    },
      err => console.log(err));
  }

  back() {
    var openingFormId = document.getElementById("openingForm");
    openingFormId.style.display = "block";
    var domainFormId = document.getElementById("domainForm");
    domainFormId.style.display = "none";
    var locationFormId = document.getElementById("locationForm");
    locationFormId.style.display = "none";
  }

  removeEmail(data: any): void {
    console.log('Removing ' + data)
    if (this.subDomainlList.indexOf(data) >= 0) {
      this.subDomainlList.splice(this.subDomainlList.indexOf(data), 1);
    }
  }


  addSubDomain(event): void {
    console.log(event.value)
    if (event.value) {
      this.subDomainlList.push({ value: event.value, invalid: false });
      this.subDomains.push(event.value);
      console.log(this.subDomains);
    }
    if (event.input) {
      event.input.value = '';
    }
  }

  addLocation() {
    var openingFormId = document.getElementById("openingForm");
    openingFormId.style.display = "none";
    var domainFormId = document.getElementById("locationForm");
    domainFormId.style.display = "block";
  }

  submitLocation() {
    alert("New location is added.");
  }

}
