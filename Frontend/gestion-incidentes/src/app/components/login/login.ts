import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';  
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: Auth, private router: Router) {}

  ngOnInit() {
  document.body.classList.add('login-page');
}

ngOnDestroy() {
  document.body.classList.remove('login-page');
}

  onSubmit() {
    console.log('email: '+this.email)

    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.token);
        localStorage.setItem('token', response.token); 
        localStorage.setItem('userId', response.userId.toString());
        console.log(response.userId)
        this.router.navigate(["/citizen-dashboard"])
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
