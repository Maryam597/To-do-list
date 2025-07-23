import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Auth } from '../auth/auth';
import { TaskService } from '../services/task.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Task, TaskRaw } from '../models/task.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    RouterModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})


export class Home implements OnInit {
  auth = inject(Auth);
  taskService = inject(TaskService);

  today: Date = new Date();
  private readonly todayBase = new Date();

  selectedDate: Date = new Date();

  tasks: Task[] = [];
  recentTasks: Task[] = []; // ✅ tâches les plus récentes
  private nextId = 1;

  newTitle: string = '';
  newDueDate: Date | null = null;
  newDescription: string = '';

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  tasks$!: Observable<Task[]>;

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.loadTasks();
    } else {
      console.warn('Utilisateur non connecté');
    }
  }

  loadTasks(): void {
    this.tasks$ = this.taskService.getTasks().pipe(
      map(tasks =>
        tasks.map(t => ({
          ...t,
          dueDate: t.dueDate ? new Date(t.dueDate) : null
        }))
      )
    );

    this.taskService.getTasks().subscribe(tasks => {
      const parsed = tasks.map(t => ({
        ...t,
        dueDate: t.dueDate ? new Date(t.dueDate) : null
      })) as Task[];

      this.tasks = parsed;

      // ✅ Sélection des 3 plus récentes par date de création
      this.recentTasks = parsed
        .filter(t => t.createdAt)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
        .slice(0, 3);
    });
  }

  addTask(): void {
    if (!this.newTitle.trim() || !this.newDueDate) return;

    const newTaskRaw: TaskRaw = {
      title: this.newTitle.trim(),
      dueDate: this.newDueDate.toISOString(),
      description: this.newDescription?.trim() || null,
      completed: false
    };

    this.taskService.addTask(newTaskRaw).subscribe(task => {
      this.tasks.push(task);
      this.nextId = Math.max(this.nextId, (task.id ?? 0) + 1);

      // Mettre à jour recentTasks
      this.recentTasks = [task, ...this.recentTasks].slice(0, 3);

      this.newTitle = '';
      this.newDueDate = null;
      this.newDescription = '';
    });
  }

  get lastTasks(): Task[] {
    return this.recentTasks;
  }

  get isYesterday(): boolean {
    return this.diffInDays(this.today, this.todayBase) === -1;
  }

  get isToday(): boolean {
    return this.diffInDays(this.today, this.todayBase) === 0;
  }

  get isTomorrow(): boolean {
    return this.diffInDays(this.today, this.todayBase) === 1;
  }

  changeDay(offset: number) {
    const newDate = new Date(this.today);
    newDate.setDate(newDate.getDate() + offset);
    const diff = this.diffInDays(newDate, this.todayBase);
    if (diff >= -1 && diff <= 1) {
      this.today = newDate;
      this.selectedDate = newDate;
    }
  }

  private diffInDays(d1: Date, d2: Date): number {
    const date1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
    const date2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
    const diffTime = date1.getTime() - date2.getTime();
    return Math.round(diffTime / (1000 * 60 * 60 * 24));
  }

  get tasksForSelectedDate(): Task[] {
    return this.tasks.filter(task =>
      task.dueDate &&
      task.dueDate.getFullYear() === this.selectedDate.getFullYear() &&
      task.dueDate.getMonth() === this.selectedDate.getMonth() &&
      task.dueDate.getDate() === this.selectedDate.getDate()
    );
  }

  onDateChange(event: any): void {
    this.today = event.value;
    this.selectedDate = event.value;
  }
}
