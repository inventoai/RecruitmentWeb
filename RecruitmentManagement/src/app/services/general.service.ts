import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private https: HttpClient) { }

  scheduleTask(formData: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.post(`${environment.recruitmentServer}/scheduletask/${adminId}`, formData);
  }

  getScheduleTask(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    var employeeId = JSON.parse(localStorage.getItem("approvedCredential"))._employeeId;
    return this.https.get(`${environment.recruitmentServer}/scheduletask/${adminId + employeeId}`);
  }

  updateTask(formData: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.put(`${environment.recruitmentServer}/scheduletask/${adminId}`, formData);
  }

  getRejectedProfiles(rejectedId): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.get(`${environment.recruitmentServer}/rejectedprofile/${adminId + rejectedId}`);
  }

  addDomain(formData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.https.post(`${environment.recruitmentLocalServer}/domains/${adminId}`, formData);
  }

}
