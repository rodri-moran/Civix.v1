import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Report {
  title : string
  description : string
  address : string
  status : string
  createdAt : Date
  userId : number

}

@Injectable({
  providedIn: 'root'
})


export class ReportServiceService {
  private apiUrl = 'http://localhost:8080/api/report/admin/getAll'

constructor(private http : HttpClient) { }
  getReports(): Observable<Report[]> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders ({
      'Authorization': `Bearer ${token}` 
    });

    return this.http.get<Report[]>(this.apiUrl, { headers });
  }

}
