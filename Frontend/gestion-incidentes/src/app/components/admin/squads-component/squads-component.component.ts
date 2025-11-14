import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient,HttpHeaders , HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const bootstrap: any;


interface Squad {
  id: number,
  name: string,
  description: string,
  area: string,
  teamSize: number
}
interface Area {
  name: string;
}

@Component({
  selector: 'app-squads-component',
  templateUrl: './squads-component.component.html',
    imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  styleUrls: ['./squads-component.component.css']
})
export class SquadsComponentComponent{
  private apiUrl = "http://localhost:8080/api/report/admin/squads";
  private apiUrlCreateSquad = "http://localhost:8080/api/report/admin/squad"

  squads: Squad [] = [] 
  areas : Area [] = [
    { name: "ALUMBRADO" },
    { name: "OBRAS"},
    { name: "RECOLECCION"},
    { name: "OTRA"}
  ]
  selectedArea: string = '';
  name: string = '';
  description: string = '';
  teamSize : number = 0;

  constructor(private http :HttpClient) {}
    ngOnInit() {
      
      const token = localStorage.getItem('token');
      console.log("token::::"+token)
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      })

      this.http.get<Squad[]>(this.apiUrl, { headers }).subscribe({
        next: (data) => {
          this.squads = data;
        },
        error: (err) => {
          console.error("Error cargando cuadrillas", err);
      }})  }

      

      createSquad(name: string, description: string, area: string, teamSize: number){
        
      }

      onSubmit(){
        if (!this.name || !this.description || !this.selectedArea || this.teamSize <= 0) {
          console.error("Formulario inválido");
          return;
        }
        const newSquad = {
          name: this.name,
          description: this.description,
          area: this.selectedArea.toUpperCase(),
          teamSize: this.teamSize
        }

        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
        });
      this.http.post<Squad>(this.apiUrlCreateSquad, newSquad, { headers }).subscribe({
        next: (data) => {
          console.log("Cuadrilla creada correctamente", data);
          this.squads.push(data);
          this.resetForm();
          this.closeModal();
        },
        error: (err) => console.log("Error al crear cuadrilla", err)
      });
      }
      resetForm() {
  this.name = '';
  this.description = '';
  this.selectedArea = '';
  this.teamSize = 0;
}
closeModal() {
  const modalEl = document.getElementById('createModal');
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
}
}
