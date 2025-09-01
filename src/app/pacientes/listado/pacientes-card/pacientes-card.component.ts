import { Component, Input } from '@angular/core';
import { Paciente } from '../../../core/interfaces/pacientes.interface';

@Component({
  selector: 'pacientes-pacientes-card',
  templateUrl: './pacientes-card.component.html',
  styleUrl: './pacientes-card.component.css'
})
export class PacientesCardComponent {

  constructor(){}

  @Input() paciente!:Paciente;

  ver(){
    console.log('as');
  }

  editar(){
    console.log('as');
  }

  eliminar(){
    console.log('as');
  }

 
  
}
