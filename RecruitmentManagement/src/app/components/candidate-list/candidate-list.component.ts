import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UploadProfileService } from 'src/app/services/upload-profile.service';
import { EmailComponent } from '../ReportDashboard/email/email.component';
import { Candidate } from '../shared/candidateModel';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  providers: [DatePipe]
})
export class CandidateListComponent implements OnInit {


  candidates: Observable<Candidate[]>;
  searchText;
  searchText1;
  approved: boolean = false;
  openingId;
  isLoading = true;

  url = "https://file-examples-com.github.io/uploads/2017/08/file_example_PPT_250kB.ppt";

  constructor(private uploadProfileService: UploadProfileService, private _location: Location, private dialog: MatDialog,
    private datePipe: DatePipe, private route: ActivatedRoute) { }

  ngOnInit() {
    this.openingId = this.route.snapshot.params["_id"];
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
    if (this.searchText == null) {
      alert("Please select valid date. Thankyou !");
      return;
    }
    this.approved = false;
    this.uploadProfileService.getCandidateList(this.route.snapshot.params["_id"] + this.searchText).subscribe(data => {
      this.candidates = data;
      console.log(this.candidates);
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
  sharedProfile(candidateID, candidateEmailId, openingId, recruiterId) {
    this.dialog.open(EmailComponent, {
      width: '580px', height: '650px', data: {
        candidateEmailId: candidateEmailId,
        candidateID: candidateID
      }
    });
    // setTimeout(() => {
    //   this.reloadData();
    //   console.log("Refreshing after 5 sec.")
    // }, 5000);
  }

  duplicateProfile(id) {
    alert("This functionality is still pending.")
    console.log("RejectedId : " + id);
  }

  rejectProfile(rejectedProfileId) {
    // alert("This functionality is still pending.")
    console.log("RejectedId : " + rejectedProfileId);
    const formdata = new FormData;
    formdata.append("rejectedProfileId", rejectedProfileId)
    this.uploadProfileService.rejectedProfile(formdata).subscribe(data => {
      console.log(data);
      this.refresh();
    },
      err => console.log(err));
  }

  viewResume(name, file) {
    console.log("ViewId : " + name);
    // const linkSource = `data:application/pdf;base64,${file}`;
    // const downloadLink = document.createElement("a");
    // const fileName = `${name}.docx`;
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();

    var tableId = document.getElementById("table");
    tableId.style.display = "none";
    var docxId = document.getElementById("docx");
    docxId.style.display = "block";
  }
  return() {
    var docxId = document.getElementById("docx");
    docxId.style.display = "none";
    var tableId = document.getElementById("table");
    tableId.style.display = "block";
  }

  back() {
    console.log("Nice");
    this._location.back();
  }
  refresh() {
    this.reloadData();
  }
}
