import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitasRoutingModule } from './citas-routing.module';
import { CitasComponent } from './citas.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { FormularioComponent } from './formulario/formulario.component';
import { CitaComponent } from './cita/cita.component';


@NgModule({
  declarations: [
    CitasComponent,
    CalendarioComponent,
    FormularioComponent,
    CitaComponent
  ],
  imports: [
    CommonModule,
    CitasRoutingModule
  ]
})
export class CitasModule { }
