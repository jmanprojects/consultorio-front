import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { ListadoComponent } from './listado/listado.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacientesCardComponent } from '../shared/components/pacientes-card/pacientes-card.component';
import { SharedModule } from '../shared/shared.module';
import { AddPacienteComponent } from './add-paciente/add-paciente.component';


@NgModule({
  declarations: [
    PacientesComponent,
    ListadoComponent,
    FormularioComponent,
    PacienteComponent,
    PacientesCardComponent,
    AddPacienteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PacientesRoutingModule,
    SharedModule
  ]
})
export class PacientesModule { }
