import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ à importer pour ngClass


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TodoComponent, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  today: Date = new Date();
  constructor() {}

}
export class AppComponent {
  constructor(public router: Router) {}
}
