import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GeneralService } from 'src/app/services/general.service';
import { Opening } from '../../shared/openiningModel';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rejected-profiles',
  templateUrl: './rejected-profiles.component.html',
  styleUrls: ['./rejected-profiles.component.scss'],
  providers: [DatePipe]
})
export class RejectedProfilesComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns = ['S.N', 'Submisssion Date', 'Name', 'Email Id', 'Mobile', 'CCTC', 'ECTC', 'NP', 'Total Experiance', 'Related Experiance', 'Location', 'Remarks', 'Profile Status'];

  candidates: Observable<Opening[]>;
  searchText;
  searchText1;
  isLoading = true;

  constructor(private generalService: GeneralService, private _location: Location, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    this.searchText = this.datePipe.transform(new Date(), 'MMMM, yyyy');
    this.reloadData();
  }
  dateFormat() {
    this.searchText = this.datePipe.transform(this.searchText1, 'longDate');
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.reloadData();
  }

  reloadData() {
    this.isLoading = true;
    this.generalService.getRejectedProfiles(this.route.snapshot.params["id"] + this.searchText).subscribe(data => {
      this.candidates = data;
      console.log(data);
      this.isLoading = false;
    },
      err => console.log(err));
  }


  action(_id) {
    alert("This functionality is still pending.");
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
