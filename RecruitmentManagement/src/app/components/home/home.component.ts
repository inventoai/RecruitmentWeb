import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  image: Observable<any>;
  // isLoading = true;
  // taskJson = [
  //   {
  //     "datetime": "Thu Jan 20 2022 17:50:57 GMT+0530 (India Standard Time)",
  //     "tasks": " I need to find 10 profiles for Invento. "
  //   },
  //   {
  //     "datetime": "Thu Jan 21 2022 15:50:57 GMT+0530 (India Standard Time)",
  //     "tasks": " I need to find 10 profiles for Invento. "
  //   },
  //   {
  //     "datetime": "Thu Jan 22 2022 13:53:27 GMT+0530 (India Standard Time)",
  //     "tasks": " I need to find 10 profiles for Invento. "
  //   }
  // ];
  taskJson: Observable<any>;
  actions = ["In processing", "Completed"]
  dataSource = [];
  isLoading = true;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private generalService: GeneralService,
    private router: Router, private _location: Location) { }

  ngOnInit(): void {
    var myDate = new Date();
    console.log(myDate);
    var user = JSON.parse(localStorage.getItem("approvedCredential"));
    console.log(user);
    this.dataSource.push(user);
    this.reloadData();
    // this.getImage().subscribe(data => {
    //   this.image = data;
    // },
    //   err => console.log(err));
    // console.log(this.image);
    // console.log("working");
    // this.getEmployee();
  }
  // getImage(): Observable<any> {
  //   return this.http.get('http://127.0.0.1:5000/uploadimage', { responseType: 'text' });
  // }

  // getEmployee() {
  //   var _id = JSON.parse(localStorage.getItem("credential")).id;
  //   console.log(_id);
  //   this.employeeService.getEmployee(_id).subscribe(data => {
  //     // this.isLoading = false;
  //     this.dataSource.push(data);
  //   });
  // }


  reloadData() {
    this.generalService.getScheduleTask().subscribe(data => {
      this.taskJson = data;
      this.isLoading = false;
    },
      err => console.log(err));
  }

  submitted = false;

  tasks = {
    date: '',
    task: '',
    employeeId: ''
  };

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }


  onSubmit() {
    // this.submitted = true;

    this.tasks.employeeId = JSON.parse(localStorage.getItem("approvedCredential"))._employeeId;
    console.log(this.tasks);
    this.save();
    //this.openingForm.reset();
  }

  save() {
    this.generalService.scheduleTask(this.tasks).subscribe(data => {
      console.log(data);
      var taskFormId = document.getElementById("taskform");
      taskFormId.style.display = "none";
      var taskTableId = document.getElementById("taskTable");
      taskTableId.style.display = "block";
      this.reloadData();
    },
      err => console.log(err));
  }

  schedule() {
    var taskTableId = document.getElementById("taskTable");
    taskTableId.style.display = "none";
    var taskFormId = document.getElementById("taskform");
    taskFormId.style.display = "block";
  }
  cancel() {
    var taskFormId = document.getElementById("taskform");
    taskFormId.style.display = "none";
    var taskTableId = document.getElementById("taskTable");
    taskTableId.style.display = "block";
  }

  updateStatus(statusValue, _id) {
    var updatedValue = {
      "status": statusValue,
      "taskId": _id
    }

    this.generalService.updateTask(updatedValue).subscribe(data => {
      console.log(data);
      var taskFormId = document.getElementById("taskform");
      taskFormId.style.display = "none";
      var taskTableId = document.getElementById("taskTable");
      taskTableId.style.display = "block";
      this.reloadData();
    },
      err => console.log(err));
  }


}
