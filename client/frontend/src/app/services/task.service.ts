import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth/auth';
import { Observable, forkJoin } from 'rxjs';
import { Task, TaskRaw } from '../models/task.model';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient, private auth: Auth) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<TaskRaw[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      map(tasksRaw =>
        tasksRaw.map(taskRaw => ({
          ...taskRaw,
          dueDate: taskRaw.dueDate ? new Date(taskRaw.dueDate) : null,
          completed: taskRaw.completed ?? false
        }))
      )
    );
  }

  addTask(taskRaw: TaskRaw): Observable<Task> {
    return this.http.post<TaskRaw>(this.apiUrl, taskRaw, { headers: this.getAuthHeaders() }).pipe(
      map(taskRaw => ({
        ...taskRaw,
        dueDate: taskRaw.dueDate ? new Date(taskRaw.dueDate) : null,
        completed: taskRaw.completed ?? false
      }))
    );
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<TaskRaw>(`${this.apiUrl}/${task.id}`, task, { headers: this.getAuthHeaders() }).pipe(
      map(taskRaw => ({
        ...taskRaw,
        dueDate: taskRaw.dueDate ? new Date(taskRaw.dueDate) : null,
        completed: taskRaw.completed ?? false
      }))
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  deleteMultipleTasks(ids: number[]): Observable<any> {
    const requests = ids.map(id => this.deleteTask(id));
    return forkJoin(requests);
  }
}
