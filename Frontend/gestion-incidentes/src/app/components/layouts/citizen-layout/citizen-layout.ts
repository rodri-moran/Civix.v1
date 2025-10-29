import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-citizen-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './citizen-layout.html',
  styleUrls: ['./citizen-layout.css']
})
export class CitizenLayoutComponent {
  isSidebarCollapsed = false;

  isOpen: boolean = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

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
