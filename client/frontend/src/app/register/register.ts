import { Component, NgZone } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class Register {
  username = '';
  email = '';
  password = '';
  rememberMe = false;
  errorMessages: string[] = [];
  successMessage = '';

  constructor(private auth: Auth, private router: Router, private ngZone: NgZone) {}

  onSubmit(): void {
    this.auth.register({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.token) {
          this.auth.saveToken(res.token, this.rememberMe);
          this.successMessage = 'Inscription réussie !';
          this.errorMessages = [];
          this.ngZone.run(() => this.router.navigate(['/tasks']));
        }
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessages = ['Erreur lors de l’inscription.'];
      }
    });
  }
}
