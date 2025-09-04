import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { ListadoComponent } from './listado/listado.component';
import { FormularioComponent } from './formulario/formulario.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacientesCardComponent } from '../shared/components/pacientes-card/pacientes-card.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PacientesComponent,
    ListadoComponent,
    FormularioComponent,
    PacienteComponent,
    PacientesCardComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedModule
  ]
})
export class PacientesModule { }
