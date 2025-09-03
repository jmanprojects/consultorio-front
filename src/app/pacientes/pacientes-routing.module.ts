import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { PacienteComponent } from './paciente/paciente.component';

const routes: Routes = [
  { path: '', component: PacientesComponent },
  { path: ':id', component: PacienteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
