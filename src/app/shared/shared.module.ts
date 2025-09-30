import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FormsModule } from '@angular/forms';

import { TopbarComponent } from './components/topbar/topbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
// import { PacientesCardComponent } from './components/pacientes-card/pacientes-card.component';




@NgModule({
  declarations: [
    BuscadorComponent,
    TopbarComponent,
    UserMenuComponent,
    NotificationsComponent,
    NavbarComponent,
    // PacientesCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    BuscadorComponent,
    TopbarComponent,
    NavbarComponent,
    // PacientesCardComponent
  ]
})
export class SharedModule { }
