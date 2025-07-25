import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskRaw } from '../models/task.model'; 

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class Tasks implements OnInit {
  tasks: Task[] = [];
  allSelected = false;

  newTask: Task = {
    title: '',
    description: '',
    completed: false,
    dueDate: null
  };

  constructor(
    private taskService: TaskService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
if (!this.auth.isLoggedIn() || !this.auth.isTokenAvailable()) {
      console.warn('Utilisateur non connecté');
      return;
    }
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        isEditing: false,
        selected: false
      }));
    });
  }

  addTask() {
  if (!this.newTask.title.trim()) return;

  const taskToAdd: TaskRaw = {
    ...this.newTask,
    dueDate: this.newTask.dueDate ? this.newTask.dueDate.toISOString() : null,
  };

  this.taskService.addTask(taskToAdd).subscribe(() => {
    this.newTask = { title: '', description: '', dueDate: null, completed: false };
    this.loadTasks();
  });
}


  deleteTask(task: Task) {
    if (confirm(`Supprimer la tâche "${task.title}" ?`)) {
      this.taskService.deleteTask(task.id!).subscribe(() => this.loadTasks());
    }
  }

  toggleTaskCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.allSelected = checked;
    this.tasks.forEach(task => (task.selected = checked));
  }

  hasSelectedTasks(): boolean {
    return this.tasks.some(task => task.selected);
  }

  deleteSelectedTasks() {
    const selectedIds = this.tasks.filter(t => t.selected).map(t => t.id!);
    if (selectedIds.length === 0) return;

    this.taskService.deleteMultipleTasks(selectedIds).subscribe(() => {
      this.loadTasks();
      this.allSelected = false;
    });
  }

  editTask(task: Task) {
    task.isEditing = true;
  }

  cancelEdit(task: Task) {
    task.isEditing = false;
  }

  saveInlineEdit(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      task.isEditing = false;
    });
  }

  trackById(index: number, task: Task): number {
    return task.id!;
  }
}
