import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css'],
  imports: [CommonModule, RouterOutlet]
})
export class AdminLayoutComponent {
  userName: string = "Usuario";
  currentRoute = '';
  isOpen = true; // sidebar abierto por defecto en desktop

  menuItems = [
    { title: 'Reportes', icon: 'bi bi-exclamation-triangle', route: '/admin/reportes' },
    { title: 'Cuadrillas', icon: 'bi bi-people', route: '/admin/cuadrillas' },
    { title: 'Noticias', icon: 'bi bi-newspaper', route: '/admin/noticias' },
    { title: 'Estadísticas', icon: 'bi bi-bar-chart', route: '/admin/estadisticas' }
  ];

  constructor(private router: Router) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => this.currentRoute = event.urlAfterRedirects);
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    if (window.innerWidth < 768) this.isOpen = false;
  }

  goToCitizenDashboard() {
    this.router.navigate(['/citizen-dashboard']);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}
