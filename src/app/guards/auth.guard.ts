import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkAuthStatus().pipe(
    map(user => {
      if (user?.role === 'runner') {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  );
};