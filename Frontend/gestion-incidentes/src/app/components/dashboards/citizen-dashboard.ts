import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';  
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-citizen-dashboard',
  imports: [FormsModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: './citizen-dashboard.html',
  styleUrl: './citizen-dashboard.css'
})
export class CitizenDashboard {
    constructor(private authService: Auth, private router: Router) {}
      isAdmin: boolean = false;

    ngOnInit() {
      const role = localStorage.getItem('role');
      this.isAdmin = role === 'ADMIN'
    }
}