import { Component, inject } from '@angular/core';
import { TodoComponent } from './todo/todo';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ à importer pour ngClass

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoComponent, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  constructor(public router: Router) {}
}
