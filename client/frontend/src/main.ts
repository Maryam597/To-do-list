import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TodoComponent } from './app/todo/todo';
import { appConfig } from './app/app.config';

bootstrapApplication(TodoComponent, {
  providers: [
    provideHttpClient()
  ]
})