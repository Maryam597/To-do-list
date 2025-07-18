import { Component, inject } from '@angular/core';
import { TodoComponent } from './todo/todo';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // si pas encore dans main.ts



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [    CommonModule,
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
export class AppComponent {
  constructor(public router: Router) {}
}
