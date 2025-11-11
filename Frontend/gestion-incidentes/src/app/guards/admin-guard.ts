import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // decodificar JWT para leer el rol
    //Un JWT tiene esta estructura: HEADER.PAYLOAD.SIGNATURE
    // atob lo decodifica desde Base64 a texto normal
    const payload = JSON.parse(atob(token.split('.')[1]));

    const role = payload.role;

    if (role === 'ADMIN') {
      return true;
    }

    this.router.navigate(['/unauthorized']); 
    return false;
  }
}
