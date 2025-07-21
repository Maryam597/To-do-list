import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
    private tokenKey = 'auth_token';

  private apiUrl = "http://localhost:8080";
  private storage: Storage = localStorage;

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: { username: string; email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string, rememberMe: boolean) {
    if (rememberMe) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
    }
  }


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
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
