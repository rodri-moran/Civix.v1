import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../../services/user-service.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  templateUrl: './editar-perfil.html',
  imports: [CommonModule, FormsModule]
})
export class EditarPerfilComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    console.log('user:',this.user.id);
    this.userService.getProfile().subscribe({
      
      next: (data) => this.user = { ...data },
      error: (err) => console.error(err)
    });
  }

  saveChanges() {
    this.userService.updateProfile(this.user).subscribe({
      next: () => {
        alert('Perfil actualizado');
        this.router.navigate(['/perfil']);
      },
      error: (err) => console.error('Error al actualizar perfil', err)
    });
  }
}
