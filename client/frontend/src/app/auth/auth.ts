import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = "http://localhost:8080";
  private storage: Storage = localStorage;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: { username: string; email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string, remember: boolean = false) {
    const storage = remember ? localStorage : sessionStorage;

    // Extraire expiration du token
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = payload.exp * 1000;

    storage.setItem('token', token);
    storage.setItem('token_expiration', expiration.toString());
  }

  getToken(): string | null {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration') || sessionStorage.getItem('token_expiration');

    if (token && expiration) {
      const now = Date.now();
      if (now > +expiration) {
        this.logout(); // token expiré
        return null;
      }
      return token;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('token_expiration');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
