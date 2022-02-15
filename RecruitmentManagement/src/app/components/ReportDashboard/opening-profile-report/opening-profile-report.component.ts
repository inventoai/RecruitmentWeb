import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OpeningService } from 'src/app/services/opening.service';
import { Opening } from '../../shared/openiningModel';
import * as XLSX from 'xlsx';


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-opening-profile-report',
  templateUrl: './opening-profile-report.component.html',
  styleUrls: ['./opening-profile-report.component.scss'],
  providers: [DatePipe]
})
export class OpeningProfileReportComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef;

  displayedColumns = ['S.N', 'Date', 'Role', 'Domain', 'Comapny Name', 'Client Name', 'Experiance', 'Budget Range', 'Notice Period', 'Openings', 'Work Allocated', 'Uploaded Profiles', 'Shared Profiles With Clients', 'Rejected Profiles By Clients'];

  openings: Observable<Opening[]>;
  searchText: any;
  searchText1: any;
  isLoading = true;

  constructor(private openingService: OpeningService, private _location: Location, private dialog: MatDialog, private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    console.log(this.searchText);
    this.reloadData();
  }
  dateFormat() {
    this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    this.reloadData();
  }

  reloadData() {
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.isLoading = true;
    console.log(this.searchText);
    this.openingService.getOpeningList(this.searchText).subscribe(data => {
      this.openings = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }

  workAllocated(id) {
    console.log("Opening Id : " + id);
    this.router.navigate(["/default/activeopening", id]);
  }
  uploadedProfiles(id) {
    console.log("Opening Id : " + id);
    this.router.navigate(["/default/candidatelist", id])
  }
  approvedProfiles(id) {
    console.log(id);
    this.router.navigate(["/default/approvedprofile", id]);
  }
  rejectedProfile(id) {
    console.log(id);
    this.router.navigate(["/default/rejectedprofile", id]);
  }

  back() {
    console.log("Nice");
    this._location.back();
  }




  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Report.xlsx');

  }

}


