import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { PacienteComponent } from './paciente/paciente.component';
import { AddPacienteComponent } from './add-paciente/add-paciente.component';

const routes: Routes = [
  { path: '', component: PacientesComponent },
  { path: 'add-paciente', component: AddPacienteComponent },
  { path: ':id', component: PacienteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule { }
