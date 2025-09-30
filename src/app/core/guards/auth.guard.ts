import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Usamos observable para que Angular espere el valor antes de renderizar
  return auth.loggedIn$.pipe(
    map(loggedIn => {
      if (loggedIn && state.url === '/auth/login') {
        return router.parseUrl('/dashboard'); // evita acceso a login si ya hay token
      }
      if (loggedIn) return true; // permite acceso
      return router.parseUrl('/auth/login'); // redirige si no hay token
    })
  );
};
