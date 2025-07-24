import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private tokenKey = 'auth_token';
  private apiUrl = "http://localhost:8080";

  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  public isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  saveToken(token: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      sessionStorage.setItem(this.tokenKey, token);
    }
    console.log('[Auth] Token sauvegardé :', token);
    this.tokenSubject.next(token);
    this.isLoggedIn$.next(true);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    console.log('[Auth] getToken() =>', token);
    return token;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  isTokenAvailable(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    const result = !!this.getToken();
    console.log('isLoggedIn:', result);
    return result;
  }
}
