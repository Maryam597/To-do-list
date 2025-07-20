import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Ajouté ici aussi
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class TodoComponent {
  tasks: Task[] = [];

  newTask: Task = {
    id: undefined,
  title: '',
  description: '', // ✅ description ajoutée
  completed: false,
  dueDate: ''
  };

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    this.taskService.addTask(this.newTask).subscribe((task: Task) => {
      this.tasks.push(task);
      this.newTask = { 
          id: undefined,
  title: '',
  description: '', // ✅ description ajoutée
  completed: false,
  dueDate: '' // si tu l’as rendue obligatoire dans l’interface Task
 };
    });
  }
}
