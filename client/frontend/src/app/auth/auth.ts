import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: { username: string; email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() : string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

}
