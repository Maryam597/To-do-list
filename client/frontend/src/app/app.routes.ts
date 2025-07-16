import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Tasks } from './tasks/tasks'
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'register', component: Login },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

];
