import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { TopbarComponent } from './components/topbar/topbar.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PacienteFormComponent } from './components/paciente-form/paciente-form.component';
import { ToastComponent } from './components/toast/toast.component';
import { ToastContainerComponent } from './components/toast-container/toast-container.component';
import { ModalEditarPacienteComponent } from './components/modal-editar-paciente/modal-editar-paciente.component';
// import { PacientesCardComponent } from './components/pacientes-card/pacientes-card.component';




@NgModule({
  declarations: [
    BuscadorComponent,
    TopbarComponent,
    UserMenuComponent,
    NotificationsComponent,
    NavbarComponent,
    PacienteFormComponent,
    ToastComponent,
    ToastContainerComponent,
    ModalEditarPacienteComponent,
    // PacientesCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscadorComponent,
    TopbarComponent,
    NavbarComponent,
    PacienteFormComponent,
    ToastContainerComponent,
    ModalEditarPacienteComponent,
    // PacientesCardComponent
  ]
})
export class SharedModule { }
