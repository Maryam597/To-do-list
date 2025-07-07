import { Component } from '@angular/core';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [],
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class TodoComponent {
  tasks = [
    { title: 'Apprendre Angular', done: false },
    { title: 'Coder la Todo List', done: false },
    { title: 'Faire un commit Git', done: false }
  ];

  newTask = '';

  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ title: this.newTask, done: false });
      this.newTask = '';
    }
  }
}
