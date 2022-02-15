import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadProfileService } from 'src/app/services/upload-profile.service';

@Component({
  selector: 'app-daily-work-report',
  templateUrl: './daily-work-report.component.html',
  styleUrls: ['./daily-work-report.component.scss'],
  providers: [DatePipe]
})
export class DailyWorkReportComponent implements OnInit {
  searchText;
  searchText1;
  employeeName;
  employeeId;
  // dataSource: Observable<DailyWorkReport[]>;
  dataSource = [];
  dataSource1: Observable<any>;
  isLoading = true;
  numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  performanceTableId;
  detailTableId;
  detailButtonId;
  performanceButtonId;

  constructor(private datePipe: DatePipe, private _location: Location, private route: ActivatedRoute, private router: Router,
    private uploadProfileService: UploadProfileService) { }

  ngOnInit() {
    this.employeeName = this.route.snapshot.params['_id'];
    this.employeeId = JSON.parse(localStorage.getItem("approvedCredential"))._employeeId;
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    this.reloadData();
  }

  dateFormat() {
    this.dataSource = [];
    this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !.");
      return;
    }
    this.reloadData();
  }

  reloadData() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.isLoading = true;
    this.uploadProfileService.getCandidateList(JSON.parse(localStorage.getItem("approvedCredential"))._employeeId + this.searchText).subscribe(data => {
      for (var val of data) {
        console.log(this.employeeId + "==" + val.recruiterId);
        if (val.recruiterId == this.employeeId) {
          this.dataSource.push(val);
          console.log("Sahi hai: " + this.dataSource);
        }
      }
      this.isLoading = false;
    });
  }


  updateCategory(id: string) {
    this.router.navigate(['/default/updatecategory', id]);
  }
  userDetails(_id: string) {
    this.router.navigate(['detailsemployee', _id]);
  }
  back() {
    this._location.back();
  }
  performanceTable() {
    this.performanceTableId = document.getElementById("performanceTable");
    this.performanceTableId.style.display = "block";
    this.detailButtonId = document.getElementById("detailButton");
    this.detailButtonId.style.display = "block";

    this.detailTableId = document.getElementById("detailsTable");
    this.detailTableId.style.display = "none";
    this.performanceButtonId = document.getElementById("performanceButton");
    this.performanceButtonId.style.display = "none";
  }
  detailsTable() {
    this.performanceTableId = document.getElementById("performanceTable");
    this.performanceTableId.style.display = "none";
    this.detailButtonId = document.getElementById("detailButton");
    this.detailButtonId.style.display = "none";

    this.detailTableId = document.getElementById("detailsTable");
    this.detailTableId.style.display = "block";
    this.performanceButtonId = document.getElementById("performanceButton");
    this.performanceButtonId.style.display = "block";
  }
  opening(openingId) {
    alert(openingId)
  }
  candiadte(id) {
    alert(id)
  }

}
