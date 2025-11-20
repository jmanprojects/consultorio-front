import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'node:stream';

@Component({
  selector: 'shared-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css'
})
export class UserMenuComponent {

  @Input() usuario: any;
  // @Output() cerrarSesion = new EventEmitter();

  // miCuenta() {
  //   // redirigir a la página del médico
  // }

  configuracion() {
    // futuro
  }

}
