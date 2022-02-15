import { DatePipe, Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { EmailComponent } from '../../ReportDashboard/email/email.component';
import { Candidate } from '../../shared/candidateModel';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-approved-profile',
  templateUrl: './approved-profile.component.html',
  styleUrls: ['./approved-profile.component.scss'],
  providers: [DatePipe]
})
export class ApprovedProfileComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef;
  displayedColumns = ['S.N', 'Submisssion Date', 'Name', 'Email Id', 'Mobile', 'CCTC', 'ECTC', 'NP', 'Total Experiance', 'Related Experiance', 'Location', 'Remarks', 'Profile Status'];

  isLoggedIn = false;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  candidates: Observable<Candidate[]>;
  searchText;
  searchText1;
  isLoading = true;

  constructor(private uploadProfileService: UploadProfileService, private _location: Location, private dialog: MatDialog,
    private datePipe: DatePipe, private route: ActivatedRoute) { }

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
    this.uploadProfileService.getSharedProfile(this.route.snapshot.params["id"] + this.searchText).subscribe(data => {
      this.candidates = data;
      this.isLoading = false;
    });
  }

  deleteUser(_id: string) {
    this.uploadProfileService.deleteCandidate(_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }
  action(candidateRmailId) {
    this.dialog.open(EmailComponent, {
      width: '580px', height: '650px', data: {
        candidateEmailIdId: candidateRmailId
      }
    });
  }


  back() {
    console.log("Nice");
    this._location.back();
  }
  refresh() {
    this.reloadData();
  }

  openMyMenu() {
    this.trigger.toggleMenu();
  }
  closeMyMenu() {
    this.trigger.closeMenu();
    console.log('close')
  }

  myFunction() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "block";
    }
  }
  book(candidateRmailId) {
    // alert("It's still pending.");
    var x = document.getElementById("myDIV");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "none";
    }

    this.dialog.open(EmailComponent, {
      width: '580px', height: '650px', data: {
        candidateEmailIdId: candidateRmailId
      }
    });

  }
  cancel() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "none";
    }
  }

  ExportTOExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Report.xlsx');

  }

}

