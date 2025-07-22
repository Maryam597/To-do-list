import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Tasks } from './tasks/tasks';
import { Home } from './home/home';
import { Register } from './register/register';
import { authGuard } from './guards/auth.guard';
import { loginRedirectGuard } from './guards/login-redirect.guard';





export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [loginRedirectGuard] },
  { path: 'tasks', loadComponent: () => import('./tasks/tasks').then(m => m.Tasks), canActivate: [authGuard] },
  { path: 'home', component: Home },
  { path: 'register', component: Register, canActivate: [loginRedirectGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
  {  path: 'tasks/new',
  canActivate: [authGuard], 
  loadComponent: () => import('./tasks/tasks').then(m => m.Tasks)
}

];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule]
  })
  export class AppRoutingModule {}

