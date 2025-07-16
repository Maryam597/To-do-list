import { Component } from '@angular/core';
import { TodoComponent } from './todo/todo';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoComponent, RouterModule],
  templateUrl: './app.html'
})
export class AppComponent {}
