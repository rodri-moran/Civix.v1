import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth'; 
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'CitizenHome',
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet],
  standalone: true,
  templateUrl: './citizen-home.html',
  styleUrl: './citizen-home.css'
})
export class CitizenHome {
    noticias = [
    {
      fecha: '12 MAR 2025',
      titulo: 'Nueva plataforma digital para reportar incidentes en tiempo real',
      descripcion: 'La comuna implementa un sistema moderno que permite a los ciudadanos reportar problemas de infraestructura, servicios públicos y emergencias de manera inmediata.',
      categoria: 'Tecnología',
      color: 'bg-primary'
    },
    {
      fecha: '10 MAR 2025',
      titulo: 'Reducción del 40% en tiempos de respuesta a incidentes urbanos',
      descripcion: 'Gracias a la digitalización de procesos, la comuna ha logrado mejorar significativamente los tiempos de atención a reportes ciudadanos.',
      categoria: 'Gestión Pública',
      color: 'bg-success'
    },
    {
      fecha: '05 MAR 2025',
      titulo: 'Capacitación a funcionarios en gestión digital de servicios',
      descripcion: 'Más de 200 funcionarios municipales han sido capacitados en el uso de herramientas digitales para mejorar la atención ciudadana.',
      categoria: 'Capacitación',
      color: 'bg-warning text-dark'
    },
    {
      fecha: '28 FEB 2025',
      titulo: 'Transparencia total: todos los incidentes ahora son públicos',
      descripcion: 'Los ciudadanos pueden consultar el estado de cualquier incidente reportado, promoviendo la transparencia y la rendición de cuentas.',
      categoria: 'Transparencia',
      color: 'bg-info text-dark'
    }
  ];
    constructor(private authService: Auth, private router: Router) {}
      isAdmin: boolean = false;





    ngOnInit() {
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ADMIN'
    }
    userName: string = "Usuario"; //hacer en back

logout() {
  localStorage.removeItem("token");
  this.router.navigate(['/login']);
}
}