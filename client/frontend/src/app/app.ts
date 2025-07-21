import { Component, inject, OnInit } from '@angular/core';
import { TodoComponent } from './todo/todo';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { Auth } from './auth/auth'; // <-- N'oublie pas d'importer ton service Auth

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TodoComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public router: Router,
    private auth: Auth 
  ) {}

  ngOnInit(): void {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
