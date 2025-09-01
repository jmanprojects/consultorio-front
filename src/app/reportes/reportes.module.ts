import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { ExportarComponent } from './exportar/exportar.component';
import { ReporteComponent } from './reporte/reporte.component';


@NgModule({
  declarations: [
    ReportesComponent,
    ExportarComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
