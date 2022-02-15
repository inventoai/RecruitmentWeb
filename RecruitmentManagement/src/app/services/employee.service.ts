import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployee(_id: string): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/employee/${_id}`);
  }

  createEmployee(formData: FormData): Observable<Object> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.post(`${environment.recruitmentServer}/employees/${_id}`, formData);
  }

  updateEmployee(_id: string, value: any): Observable<Object> {
    return this.http.put(`${environment.recruitmentServer}/${_id}`, value);
  }

  deleteEmployee(_id: string): Observable<any> {
    return this.http.delete(`${environment.recruitmentServer}/employee/${_id}`, { responseType: 'text' });
  }

  getEmployeeList(): Observable<any> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/employees/${_id}`);
  }

  registerCompany(formData: FormData): Observable<Object> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.post(`${environment.recruitmentServer}/registercompany/${adminId}`, formData);
  }
  getCompanyList(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/registercompany/${adminId}`);
  }
  registerClient(client: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.post(`${environment.recruitmentServer}/registerclient/${adminId}`, client);
  }
  getClientList(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    console.log(adminId);
    return this.http.get(`${environment.recruitmentServer}/registerclient/${adminId}`)
  }

  loginEmployee(loginJson: Object): Observable<any> {
    var loginType = JSON.parse(localStorage.getItem("loginCredential")).loginType;
    console.log(loginType);
    if (loginType == "Admin") {
      return this.http.post(`${environment.recruitmentServer}/loginadmin`, loginJson);
    }
    else {
      return this.http.post(`${environment.recruitmentServer}/employeelogin`, loginJson);
    }
  }

  dailyWorkReport(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.recruitmentServer}/dailyworkreport/${adminId}`)
  }

}
