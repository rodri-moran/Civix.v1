import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Report {
  id: number, 
  title: string,
  description: string,
  address: string,
  status: string
  createdAt: string;
  squad?: Squad;
  imageUrl?: string
}
interface Squad {
  id: number;
  name: string;
  description: string;
  area: string;
  teamSize: number;
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

  assignSquadToReport(reportId: number,squadId: number): Observable<Report> { 
    console.log("reportId: " +reportId+" y squadId: "+squadId)
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Report>(
    `http://localhost:8080/api/report/admin/report/${reportId}/assign/${squadId}`,
      {},
      { headers });
  }


}
