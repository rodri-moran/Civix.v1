import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
  imports: [RouterOutlet, CommonModule]
})
export class AdminLayoutComponent {
  hasSelected = false;
  currentRoute = '';

  menuItems = [
    { title: 'Reportes', icon: 'bi bi-exclamation-triangle', route: '/admin-reports', description: 'Ver y gestionar reportes.' },
    { title: 'Cuadrillas', icon: 'bi bi-people', route: '/admin/cuadrillas', description: 'Administrar y asignar cuadrillas.' },
    { title: 'Noticias', icon: 'bi bi-newspaper', route: '/admin/noticias', description: 'Publicar y editar noticias.' },
    { title: 'Estadísticas', icon: 'bi bi-bar-chart', route: '/admin/estadisticas', description: 'Visualizar métricas.' }
  ];

  constructor(private router: Router) {}

  navigate(route: string) {
    this.hasSelected = true;
    this.currentRoute = route;
    this.router.navigate([route]);
  }
}
