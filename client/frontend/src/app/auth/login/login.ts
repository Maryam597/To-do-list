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
          if (res.user) {
  localStorage.setItem('user', JSON.stringify(res.user));
}

          
          setTimeout(() => {
            if (this.auth.isLoggedIn()) {
              this.router.navigate(['/tasks']);
            } else {
              alert('Le token n’a pas été stocké correctement.');
              console.warn('Token manquant après sauvegarde');
            }
          }, 100); // 100ms d’attente

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
