import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { Auth } from '../auth/auth'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class Tasks implements OnInit {
  tasks: Task[] = [];

  newTask: Task = {
    title: '',
    description: '',
    completed: false,
    dueDate: '' 
  };

  constructor(private taskService: TaskService,
        private auth: Auth // <-- Injecte Auth ici
    
  ) {}

ngOnInit(): void {
  if (!this.auth.isLoggedIn()) {
    console.warn('Utilisateur non connecté, redirection...');
    return;
  }

  this.loadTasks();
}



  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      console.log("Tâches récupérées :", tasks);
      this.tasks = tasks;
    });
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.description) {
      return;
    }

    this.taskService.addTask(this.newTask).subscribe(
      () => {
        this.newTask = {
          id: undefined,
          title: '',
          description: '',
          completed: false,
          dueDate: '' // ✅ Réinitialisation ici aussi
        };
        this.loadTasks();
      },
      (error) => {
        console.error('Erreur lors de l’ajout de la tâche', error);
      }
    );
  }

  updateTask(task: Task) {
    this.taskService.updateTask(task).subscribe(() => {
      console.log("Tâche mise à jour :", task);
    });
  }

  deleteTask(task: Task) {
    if (confirm(`Supprimer la tâche "${task.title}" ?`)) {
      this.taskService.deleteTask(task.id!).subscribe(() => this.loadTasks());
    }
  }
}
