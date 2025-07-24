import { inject } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth/auth';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const auth = inject(Auth);
  const token = auth.getToken();

  // 👉 LOGS pour debug
  console.log('[Interceptor] URL:', req.url);
  console.log('[Interceptor] Token:', token);

  // 👉 Si le token existe, on ajoute l'en-tête Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 👉 Sinon, on laisse passer la requête telle quelle
  return next(req);
};
