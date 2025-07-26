import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  isTokenAvailable() : boolean {
  return !!(localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token'));
  }
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  saveToken(token: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem('auth_token', token);
    } else {
      sessionStorage.setItem('auth_token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
