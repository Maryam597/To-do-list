import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    if (!this.newTask.title.trim()) return;
    this.taskService.addTask(this.newTask).subscribe(() => {
      this.newTask = { title: '', completed: false };
      this.loadTasks();
    });
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(task: Task) {
    if (confirm(`Supprimer la tâche "${task.title}" ?`)) {
      this.taskService.deleteTask(task.id!).subscribe(() => this.loadTasks());
    }
  }
}
