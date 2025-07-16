import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [], // rien à mettre ici pour HttpClient
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.auth.saveToken(res.token);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      },
    });
  }
}
