import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningService {
  //private baseUrl = 'http://127.0.0.1:5000';


  constructor(private http: HttpClient) { }

  getOpening(_id: string): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/opening/${adminId}/${_id}`);
  }

  createOpening(opening: Object): Observable<Object> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/opening/${adminId}`, opening);
  }

  updateAppUser(_id: string, value: any): Observable<Object> {
    return this.http.put(`${environment.recruitmentServer}/${_id}`, value);
  }

  deleteAppUser(_id: string): Observable<any> {
    return this.http.delete(`${environment.recruitmentServer}/${_id}`, { responseType: 'text' });
  }

  getOpeningList(_date): Observable<any> {
    console.log("Service Date : " + _date);
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/opening/${adminId + _date}`);
  }

  uploadSampleProfile(formData): Observable<any> {
    return this.http.post(`${environment.recruitmentServer}/candidateresume`, formData);
  }
}
