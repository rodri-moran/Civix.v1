import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponse {
  token: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth/login';
  private apiRegisterUrl = 'http://localhost:8080/api/auth/register'
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password });
  }

  register(name: string, lastName: string, email: string, passwordHash: string, role: string){
    return this.http.post<AuthResponse>(this.apiRegisterUrl, {
      name,
      lastName,
      email,
      passwordHash,
      role    
    })
  }
}
