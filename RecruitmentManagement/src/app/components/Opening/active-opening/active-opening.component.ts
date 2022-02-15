import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkAllocationService } from '../../../services/work-allocation.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-active-opening',
  templateUrl: './active-opening.component.html',
  styleUrls: ['./active-opening.component.scss'],
  providers: [DatePipe]
})
export class ActiveOpeningComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef;

  displayedColumns = ['S.N', 'Date', 'Time', 'Recruiter Name', 'Comapny Name', 'Client Name', 'Requirement'];

  searchText;
  searchText1;
  dataSource: any = [];
  openingId;
  isLoading = true;

  constructor(private router: Router, private workAllocationService: WorkAllocationService, private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.openingId = this.route.snapshot.params["_id"];
    console.log("Check karo ::" + this.openingId);
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    this.reloadWorkAllocation();
  }
  dateFormat() {
    this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.reloadWorkAllocation();
  }
  reloadWorkAllocation() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.isLoading = true;
    this.workAllocationService.getAlocatedList(this.openingId + this.searchText).subscribe(data => {
      console.log(data);
      this.dataSource = data;
      this.isLoading = false;
      // for (var val of data) {
      //   console.log(val.recruiterId + " " + val.openingId + " " + val.date_time);
      //   this.dt.push(val.date_time);
      //   this.employeeService.getEmployee(val.recruiterId).subscribe(data => {
      //     this.employees.push(data);
      //     console.log(data);
      //   });
      //   this.openingService.getOpening(val.openingId).subscribe(data => {
      //     if (data.status == 20) {
      //       this.openings.push(data);
      //       console.log(data);
      //     }
      //     this.openings.push(data);
      //     console.log(data);
      //   });
      // }
    });
    // console.log("Openings:" + this.openings);
  }

  list() {
    this.router.navigate(['/employeelist']);
  }
  editWorkAllocation() {
    alert("It is still pending")
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Report.xlsx');

  }
}
