import { Component, NgZone } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: true,
  imports: [
    FormsModule]

})
export class Login {
  email = '';
  password = '';
  rememberMe = false;
  errorMessages: string[] = [];

  constructor(private auth: Auth, private router: Router, private ngZone: NgZone) {}

  onSubmit(): void {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.token) {
          this.auth.saveToken(res.token, this.rememberMe);
          this.errorMessages = [];
          this.ngZone.run(() => this.router.navigate(['/tasks']));
        }
      },
      error: (err) => {
        this.errorMessages = ['Login failed. Please check your credentials.'];
      }
    });
  }
}
