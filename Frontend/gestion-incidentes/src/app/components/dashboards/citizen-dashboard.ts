import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';  
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-citizen-dashboard',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './citizen-dashboard.html',
  styleUrl: './citizen-dashboard.css'
})
export class CitizenDashboard {
    constructor(private authService: Auth, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}