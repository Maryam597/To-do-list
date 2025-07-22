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

  constructor(private http: HttpClient, private router: Router) {}

  login(data: { email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  register(data: { username: string; email: string; password: string}) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

saveToken(token: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(this.tokenKey, token);
  } else {
    sessionStorage.setItem(this.tokenKey, token);
  }
  this.isLoggedIn$.next(true);
}


  getToken(): string | null {
    return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.tokenKey);
      this.isLoggedIn$.next(false);

    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const result = !!token;
    console.log('isLoggedIn:', result);
    return result;
  }

  public isLoggedIn$ = new BehaviorSubject<boolean>(this.checkInitialLogin());

private checkInitialLogin(): boolean {
  return !!this.getToken();
}

}
