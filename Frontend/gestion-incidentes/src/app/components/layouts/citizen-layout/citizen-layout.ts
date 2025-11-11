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
  isLoggedIn: boolean = false;
  userName: string = 'Invitado';
  isOpen: boolean = false;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  constructor(private authService: Auth, private router: Router) {}
      isAdmin: boolean = false;

    ngOnInit() {
      console.log('citizen-layout cargado')
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role');
      const storedName = localStorage.getItem('userName');
      this.isAdmin = role === 'ADMIN'

      if(token){
        this.isLoggedIn = true;
        this.isAdmin = role === 'ADMIN';
        this.userName = storedName || 'Usuario';
      } else {
        this.isLoggedIn = false;
        this.userName = 'Invitado';
      }
    } 


logout() {
  localStorage.clear();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);
}
}
