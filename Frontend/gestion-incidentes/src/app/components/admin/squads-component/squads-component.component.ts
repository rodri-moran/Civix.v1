import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
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
export class SquadsComponentComponent {
  private apiUrl = "http://localhost:8080/api/report/admin/squads";
  private apiUrlCreateSquad = "http://localhost:8080/api/report/admin/squad"

  squads: Squad[] = []
  areas: Area[] = [
    { name: "ALUMBRADO" },
    { name: "OBRAS" },
    { name: "RECOLECCION" },
    { name: "OTRA" }
  ]
  selectedArea: string = '';
  name: string = '';
  description: string = '';
  teamSize: number = 0;

  constructor(private http: HttpClient) { }
  ngOnInit() {

    const token = localStorage.getItem('token');
    console.log("token::::" + token)
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    this.http.get<Squad[]>(this.apiUrl, { headers }).subscribe({
      next: (data) => {
        this.squads = data;
      },
      error: (err) => {
        console.error("Error cargando cuadrillas", err);
      }
    })
  }



  createSquad(name: string, description: string, area: string, teamSize: number) {

  }

  onSubmit() {
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
  squadToEdit: Squad | null = null;
  idSquadToDelete: number | null = null;
  openEditModal(squad: Squad) {

    this.squadToEdit = { ...squad };
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

  editSquad() {
    if (!this.squadToEdit) return;

    const { id, ...body } = this.squadToEdit;

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    this.http.put<Squad>(`http://localhost:8080/api/report/admin/squad/${id}`,
      body,
      { headers }).subscribe({
        next: (updateSquad) => {
          // this.loadSquads();
          const index = this.squads.findIndex(s => s.id === updateSquad.id);

          if (index !== -1) {
            this.squads[index] = updateSquad;
          }


          this.closeEditModal();
          console.log('Response: ', updateSquad)
          this.showSuccessToast();
        },
        error: (err) => {
          console.log('error: ', err)
          this.showErrorToast();
        }
      }
      )
  }
  closeEditModal() {
    const modalEl = document.getElementById('editModal');
    if (modalEl) {
      bootstrap.Modal.getInstance(modalEl)?.hide();
    }
    this.squadToEdit = null;
  }
  showSuccessToast() {
    const toastEl = document.getElementById('toastSuccess');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  showErrorToast() {
    const toastEl = document.getElementById('toastError');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 4000 });
      toast.show();
    }
  }

  openDeleteModal(id: number) {
    this.idSquadToDelete = id;
  }

  confirmDelete() {
    if (!this.idSquadToDelete) return;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    this.http.delete(`http://localhost:8080/api/report/admin/squad/${this.idSquadToDelete}/delete`, { headers })
      .subscribe({
        next: () => {
          this.squads = this.squads.filter(s => s.id !== this.idSquadToDelete);
          this.closeDeleteModal();
          this.showSuccessDeleteToast();
        }, error: () => {
          this.closeDeleteModal();

          this.showErrorDeleteToast();
        }
      })
  }

  showSuccessDeleteToast() {
    const toastEl = document.getElementById('toastSuccessDelete');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  showErrorDeleteToast() {
    const toastEl = document.getElementById('toastErrorDelete');
    if (toastEl) {
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  }

  closeDeleteModal() {
  const modalEl = document.getElementById('deleteModal');
  if (modalEl) {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }
  this.idSquadToDelete = null;
}

}

