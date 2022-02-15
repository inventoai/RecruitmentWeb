import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkAllocationService {


  constructor(private http: HttpClient) { }

  allocateWork(work: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.post(`${environment.recruitmentServer}/workallocation/${adminId}`, work);
  }

  getWorkList(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/workallocation/${adminId}`);
  }

  getAlocatedList(_openingId): Observable<any> {
    console.log("_date" + _openingId);
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/workallocationlistbyopeningid/${adminId + _openingId}`);
  }

}
