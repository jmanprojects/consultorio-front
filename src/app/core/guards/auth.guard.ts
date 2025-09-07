import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree  } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state): boolean | UrlTree => {

  const auth = inject(AuthService);
  const router = inject(Router);
  console.log('cha cha cha');
  if (auth.isLoggedIn()) {
    console.log('si hay token');
    return true;
  } 
    console.log('no hay token');
    return router.parseUrl('/auth/login'); 
    // router.navigate(['/auth/login']);
    // return false;
  
};


// despues de loguearme gurado la ruta y me redirijo a ella.
// if (auth.isLoggedIn()) {
//   return true;
// } else {
//   router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
//   return false;
// }



// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     if (!this.auth.isLoggedIn()) {
//       this.router.navigate(['/auth/login']);
//       return false;
//     }
//     return true;
//   }
// }
