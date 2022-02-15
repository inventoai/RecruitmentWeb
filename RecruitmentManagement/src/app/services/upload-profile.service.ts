import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadProfileService {

  constructor(private http: HttpClient) { }

  getResumeDetail(formData): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/candidateresume`, formData);
  }
  uploadProfile(resumeData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/uploadprofile/${adminId}`, resumeData);
  }
  getCandidateList(openingId): Observable<any> {
    console.log("_date" + openingId);
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/uploadprofile/${adminId + openingId}`);
  }
  deleteCandidate(_id: string): Observable<any> {
    return this.http.delete(`${environment.recruitmentServer}/uploadprofile/${_id}`, { responseType: 'text' })
  }

  sentMail(email: Object): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/candidatemail`, email);
  }

  getBinaryFile(formData): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/uploadimage`, formData);
  }

  sharedProfile(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/sharedprofile/${adminId}`, formData);
  }

  getSharedProfile(approvedprofileId): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/sharedprofile/${adminId + approvedprofileId}`);
  }

  rejectedProfile(formData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/rejectedprofile/${adminId}`, formData);
  }


}
