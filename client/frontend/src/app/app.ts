import { Component, OnInit } from '@angular/core';
import { Tasks } from './tasks/tasks';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Auth } from './auth/auth'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Tasks,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;

  constructor(
    public router: Router,
    private auth: Auth 
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.auth.logout();
  }

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}
