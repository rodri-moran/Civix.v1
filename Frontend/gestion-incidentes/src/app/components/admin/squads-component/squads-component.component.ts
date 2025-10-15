import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient,HttpHeaders , HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Squad {
  id: number,
  name: string,
  description: string,
  area: string,
  teamSize: number
}

@Component({
  selector: 'app-squads-component',
  templateUrl: './squads-component.component.html',
    imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  styleUrls: ['./squads-component.component.css']
})
export class SquadsComponentComponent{
  private apiUrl = "http://localhost:8080/api/report/admin/squads";

  squads: Squad [] = [] 

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

      crearCuadrilla(){
        
      }
}
