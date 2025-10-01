import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const bootstrap: any;

interface ResponseDto {
  title: string;
  description: string;
  address: string;
}

@Component({
  selector: 'app-reportar-incidente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './reportar-incidente.html',
  styleUrls: ['./reportar-incidente.css']
})
export class ReportarIncidente {
  @ViewChild('registerForm') registerForm!: NgForm;

  title: string = '';
  description: string = '';
  address: string = '';
  userId: number = Number(localStorage.getItem('userId'));

  private apiUrl = 'http://localhost:8080/api/report/public';

  constructor(private http: HttpClient) {}

  createReport(title: string, description: string, address: string, userId: number): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(this.apiUrl, { title, description, address, userId });
  }

  onSubmit(): void {
    if (!this.title || !this.description || !this.address) {
      this.showErrorModal();
      return;
    }

    this.createReport(this.title, this.description, this.address, this.userId).subscribe({
      next: (response) => {
        this.showSuccessModal();

        try {
          this.registerForm.resetForm();
        } catch (e) {
          console.warn('registerForm no inicializado para resetear:', e);
        }
      
        this.title = '';
        this.description = '';
        this.address = '';
      },
      error: (err) => {
        console.error('Error al crear reporte', err);
        this.showErrorModal();
      }
    });
  }

  private showSuccessModal(): void {
    const el = document.getElementById('successModal');
    if (!el) {
      alert('Reporte enviado correctamente'); 
      return;
    }
    const modal = new bootstrap.Modal(el);
    modal.show();

    setTimeout(() => modal.hide(), 3000);
  }

  private showErrorModal(): void {
    const el = document.getElementById('errorModal');
    if (!el) {
      alert('Error al enviar el reporte'); 
      return;
    }
    const modal = new bootstrap.Modal(el);
    modal.show();
  }
}
