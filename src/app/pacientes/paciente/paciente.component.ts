import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { PacienteService } from '../../core/services/pacientes.service';
import { Paciente } from '../../core/interfaces/pacientes.interface';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrl: './paciente.component.css'
})
export class PacienteComponent {

  paciente!: Paciente ;
  mostrarModal = false;

  constructor(
    private route: ActivatedRoute,
    private pacientesService:PacienteService)
    {

  }

  ngOnInit(){
    const id = +this.route.snapshot.params['id'];
    this.pacientesService.getPacienteDetalle(id).subscribe(paciente => {
      if(paciente){
        console.log(paciente);
        this.paciente = paciente;
      }else{
        console.log('No se encontro el paciente');
      }
    // this.paciente = data;
  });
  }


  abrirModal() {
    this.mostrarModal = true;
  }

  actualizarPaciente(datos: Paciente) {
    this.pacientesService.updatePaciente(this.paciente.id, datos).subscribe({
      next: pacienteActualizado => {
        this.paciente = pacienteActualizado;
        // Aquí puedes mostrar un toast
      },
      error: err => {
        console.error('Error al actualizar', err);
      }
    });
  }

  @ViewChild('fileInput') fileInput!: ElementRef;

triggerFileInput() {
  this.fileInput.nativeElement.click();
}

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('foto', file);

  this.pacientesService.updatePhotoPaciente(this.paciente.id, formData)
    .subscribe((response) => {
      this.paciente.foto = response.foto;
      // console.log(response.foto);
      // Actualiza la vista sin recargar
      // const reader = new FileReader();
      // reader.onload = () => this.paciente.foto = reader.result as string;
      // reader.readAsDataURL(file);
    });
}


}
