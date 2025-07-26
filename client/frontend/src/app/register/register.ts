import { Component, NgZone } from '@angular/core';
import { Auth } from '../auth/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ]
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
    this.auth.register({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (res.token) {
          this.auth.saveToken(res.token, this.rememberMe);
          this.successMessage = 'Inscription réussie !';
          this.errorMessages = [];
          this.ngZone.run(() => this.router.navigate(['/tasks']));
        }
      },
      error: () => {
        this.successMessage = '';
        this.errorMessages = ['Erreur lors de l’inscription.'];
      }
    });
  }
}
