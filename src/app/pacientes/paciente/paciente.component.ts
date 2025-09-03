import { Component } from '@angular/core';
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
}
