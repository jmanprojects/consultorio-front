import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BuscadorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BuscadorComponent
  ]
})
export class SharedModule { }
