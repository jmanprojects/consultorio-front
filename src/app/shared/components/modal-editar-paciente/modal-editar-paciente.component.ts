import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../core/interfaces/pacientes.interface';

@Component({
  selector: 'shared-modal-editar-paciente',
  templateUrl: './modal-editar-paciente.component.html',
  styleUrl: './modal-editar-paciente.component.css'
})
export class ModalEditarPacienteComponent {

  @Input() paciente!: Paciente;
  @Output() cerrar = new EventEmitter<void>();
  @Output() pacienteEditado = new EventEmitter<Paciente>();
  constructor(){

  }

  editarPaciente(event: {data:Paciente, file?: File | null}) {
    const {data} = event;
    const { foto, ...finalData } = data;
    console.log("aqui esta el padre editar paciente",finalData); 
    this.pacienteEditado.emit(finalData);
    this.cerrarModal();
  }

  cerrarModal() {
    this.cerrar.emit();
  }

}
