import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Report {
  id: number, 
  title: string,
  description: string,
  address: string,
  status: string
  createdAt: string;
}


@Component({
  selector: 'app-mis-reportes',
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './mis-reportes.html',
  styleUrl: './mis-reportes.css'
})
export class MisReportes {
  statusLabels: any = {
  PENDING: { text: 'Pendiente', class: 'bg-primary text-white' },
  IN_PROCESS: { text: 'En proceso', class: 'bg-warning text-dark' },
  RESOLVED: { text: 'Resuelto', class: 'bg-success text-white' }
};
  private apiUrl = "http://localhost:8080/api/report/public/get-by-user-id"
  reports: Report[] = [];
  
  constructor(private http: HttpClient){}    
    ngOnInit() {
      const userIdStr = localStorage.getItem('userId');
      if(userIdStr) {
        const userId = Number(userIdStr);
        const url = `${this.apiUrl}/${userId}`;
        this.http.get<Report[]>(url).subscribe({
          next: (data) => {
            this.reports = data;
          },
          error: (err) => {
          console.error("Error cargando reportes", err);
        }
        })
      }
    }
  }