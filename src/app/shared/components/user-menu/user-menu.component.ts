import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
@Component({
  selector: 'shared-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

  constructor( 
    private authService:AuthService,
    private router: Router
   ){}
  // @Input() usuario: any;
  // @Output() cerrarSesion = new EventEmitter();

  // miCuenta() {
  //   // redirigir a la página del médico
  // }

  configuracion() {
    // futuro
  }

  closeSesion(){
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.router.navigate(['/auth/login']);
      }
    })
  }

}
