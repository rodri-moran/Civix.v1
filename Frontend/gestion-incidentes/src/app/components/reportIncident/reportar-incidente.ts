import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../../services/auth';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';


declare const bootstrap: any;

interface ResponseDto {
  title: string;
  description: string;
  address: string;
}

@Component({
  selector: 'app-reportar-incidente',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterOutlet],
  templateUrl: './reportar-incidente.html',
  styleUrls: ['./reportar-incidente.css']
})
export class ReportarIncidente {

  private currentMarker?: L.Marker;

  @ViewChild('registerForm') registerForm!: NgForm;

  title: string = '';
  description: string = '';
  address: string = '';
  userId: number = Number(localStorage.getItem('userId'));
  longitude?: number;
  latitude?: number;

  isLoggedIn: boolean = false;

  private map!: L.Map;

  private apiUrl = 'http://localhost:8080/api/report/public';

  constructor(private http: HttpClient, private authService: Auth) {}

  ngOnInit() {
  
    const token = this.authService.getToken();
    this.isLoggedIn = !!token;
  }

  ngAfterViewInit(): void {
  setTimeout(() => {
    this.map = L.map('map').setView([-31.4167, -64.1833], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.latitude = lat;
      this.longitude = lng;

       if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      this.currentMarker = L.marker([lat, lng]).addTo(this.map);
    });
  }, 50);
}

  createReport(title: string, description: string, address: string, latitude: number, longitude: number, userId: number): Observable<ResponseDto> {
    console.log('longitud: ', this.longitude, 'latitud: ', this.latitude)
    return this.http.post<ResponseDto>(this.apiUrl, { title, description, address, latitude, longitude, userId });
  }

  onSubmit(): void {
    console.log('longitud: ', this.longitude, 'latitud: ', this.latitude)
    if (!this.title || !this.description || !this.address || !this.latitude || !this.longitude) {
      this.showErrorModal();
      return;
    }
      
    this.createReport(this.title, this.description, this.address, this.latitude, this.longitude, this.userId).subscribe({      
      next: (response) => {
        console.log('response: ', response)
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
