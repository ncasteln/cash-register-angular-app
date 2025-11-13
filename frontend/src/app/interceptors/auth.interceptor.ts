import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

/* Intercept every http request; need to configure it in app.config,
allowing withInterceptors() and adding this to the array. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', ['Bearer', token])
    });
    return next(authReq)
  }
  return next(req);
};
