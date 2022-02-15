import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../ReportDashboard/models/employeeModel';
import { Opening } from '../../shared/openiningModel';
import { WorkAllocationService } from '../../../services/work-allocation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { DatePipe } from '@angular/common';
import { OpeningService } from 'src/app/services/opening.service';

@Component({
  selector: 'app-work-allocation',
  templateUrl: './work-allocation.component.html',
  styleUrls: ['./work-allocation.component.scss'],
  providers: [DatePipe]
})
export class WorkAllocationComponent implements OnInit {

  openings: Observable<Opening[]>;
  searchText;
  searchText1;
  employees: Observable<Employee[]>;
  slots = ["09:30AM-11:00AM", "11:00AM-01:00AM", "02:00AM-04:00AM", "04:00AM-06:30AM"]
  recruiterId;
  openiningId;
  slot;
  isLoading = true;
  constructor(private router: Router, private openingService: OpeningService, private employeeService: EmployeeService,
    private workAllocationService: WorkAllocationService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    console.log(this.searchText);
    this.reloadData();
    this.reloadEmployee();
  }
  dateFormat() {
    this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.reloadData();
  }

  reloadData() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return ;
    }
    this.isLoading = true;
    var temp;
    this.openingService.getOpeningList(this.searchText).subscribe(data => {
      data.forEach(function (arrayItem) {
        var x = arrayItem;
        console.log("__" + x.status);
        // if (x.status == 10) {
        //   temp = data;
        // }
        temp = data;
      });
      this.openings = temp;
      console.log(this.openings);
      this.isLoading = false;
    },
      err => console.log(err));
  }
  reloadEmployee() {
    this.employeeService.getEmployeeList().subscribe(data => {
      this.employees = data;
      console.log(data);
    }),
      err => {
        console.log(err);
      }
  }

  recruiterAllocation(value, _id) {
    this.recruiterId = value;
    this.openiningId = _id;
    console.log(this.recruiterId + " " + this.openiningId);
  }
  slotAllocation(value) {
    this.slot = value;
    console.log(this.slot);
  }

  workAllocation(_id) {
    console.log(this.openiningId + " " + this.recruiterId + " " + this.slot);
    this.workAllocationService.allocateWork({
      "openingId": this.openiningId,
      "recruiterId": this.recruiterId,
      "slot": this.slot
    }).subscribe(data => {
      console.log(data);
      if (data.statusCode == 302) {
        alert(data.message);
      }
      else {
        this.router.navigate(['/default/activeopening', _id]);
      }
    },
      error => console.log(error));
  }

  deleteUser(_id: string) {
    this.openingService.deleteAppUser(_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  list() {
    this.router.navigate(['/default/home']);
  }


}
