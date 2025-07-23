import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [    
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerData = {
    username: '',
    email: '',
    password: '',
  };

  errorMessages: string[] = [];
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>('http://localhost:8080/api/users/register', this.registerData).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('authToken', res.token);
          this.successMessage = "Inscription réussie !";
          this.errorMessages = [];

          // Redirection vers la page des tâches
          this.router.navigate(['/tasks']);
        } else {
          this.errorMessages = ["Inscription réussie mais aucun token reçu."];
        }
      },
      error: (err) => {
        this.successMessage = '';
        if (typeof err.error === 'string') {
          this.errorMessages = [err.error];
        } else if (Array.isArray(err.error)) {
          this.errorMessages = err.error;
        } else if (typeof err.error === 'object') {
          // Afficher chaque message dans un tableau d'erreurs
this.errorMessages = (Object.values(err.error).flat() as string[]);
        } else {
          this.errorMessages = ['Une erreur inconnue est survenue.'];
        }
      },
    });
  }
}
