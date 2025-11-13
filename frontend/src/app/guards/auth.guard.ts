import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

/* Guards the router, allowing access only in case of login */
export const authGuard: CanActivateFn = (route, state) => {
  const authSerivice = inject(AuthService);
  const router = inject(Router);

  if (authSerivice.isLoggedIn())
    return true;
  else
    router.navigate(['/login'])
  return false;
};
