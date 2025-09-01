import { Component, OnInit } from '@angular/core';
import { Paciente } from '../../core/interfaces/pacientes.interface';
import { PacienteService } from '../../core/services/pacientes.service';

@Component({
  selector: 'pacientes-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  pacientesFiltrados: Paciente[] = [];
  pacientes: Paciente [] = [];

  constructor( private pacientesService: PacienteService){
  }

  ngOnInit(): void {
    this.pacientes = this.pacientesService.getPacientes();
  }

  // pacientesFiltrados: string = [];
  filtrarPacientes(termino: string): void {
    this.pacientesFiltrados = this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(termino)
    );
  }
}

