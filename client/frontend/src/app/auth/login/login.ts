import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  email = '';
  password = '';
  rememberMe = false;

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    console.log('Tentative de connexion avec', this.email, this.password);
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        console.log('Réponse API login:', res);
        if (res.token) {
          this.auth.saveToken(res.token, this.rememberMe);
          this.router.navigate(['/tasks']);
        } else {
          alert('Token manquant dans la réponse');
        }
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      },
    });
  }
}
