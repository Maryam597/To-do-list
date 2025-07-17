import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Tasks } from './tasks/tasks';
import { Home } from './home/home';
import { Register } from './register/register';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'tasks', component: Tasks },
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];


  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [ RouterModule]
  })
  export class AppRoutingModule {}
