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



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss'],
  standalone: true,
  imports: [CommonModule, 
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

  newTask: Task = {
    title: '',
    description: '',
    completed: false,
    dueDate: '' 
  };

  constructor(private taskService: TaskService,
        private auth: Auth // <-- Injecte Auth ici
    
  ) {}

  toggleTaskCompletion(task: any): void {
  task.completed = !task.completed;
  this.updateTask(task); 
}


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
    if (!this.newTask.title) {
      return;
    }
  if (!this.newTask.dueDate) {
    this.newTask.dueDate = null;
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
