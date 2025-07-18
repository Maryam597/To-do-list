import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
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

  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:8080/api/users/register', this.registerData).subscribe({
      next: (res) => {
        this.successMessage = "Inscription réussie !";
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.error;
        this.successMessage = '';
      },
    });
  }
}
