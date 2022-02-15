import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Client } from '../models/employeeModel';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clients: Observable<Client[]>
  searchText;
  isLoading = true;
  dataSource = null;
  constructor(private router: Router, private clientService: EmployeeService) { }

  ngOnInit(): void {
    this.reloadData2();
  }

  reloadData2() {
    this.clientService.getClientList().subscribe(data => {
      this.clients = data;
      this.isLoading = false;
    });
  }

  deleteClient(_id: string) {
    alert("Pending");
  }
  updateClient(id: string) {
    alert("Pending.")
    // this.router.navigate(['/employeedetail', id]);
  }
  employeeDetail(_id: string) {
    alert("Pending")
    // this.router.navigate(['/employeedetail', _id]);
  }

}
