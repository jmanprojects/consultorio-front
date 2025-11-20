import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../../core/interfaces/pacientes.interface';
import { PacienteService } from '../../core/services/pacientes.service';

@Component({
  selector: 'pacientes-listado',
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent implements OnInit {
  pacientes: Paciente [] = [];
  pacientesFiltrados: Paciente[] = [];

  constructor( 
    private pacientesService: PacienteService,
    private router: Router,
  ){
  }

  ngOnInit(): void {
    this.cargarPacientes();
   //this.pacientes = this.pacientesService.getPacientes();
    // console.log(this.pacientesFiltrados);
    //this.pacientesFiltrados = [...this.pacientes];
  }

  cargarPacientes(){
    this.pacientesService.getPacientes().subscribe({
      next: data => {
        console.log('resp: ', data);
        this.pacientes= data;
      },
      // next: data => this.pacientes= data,
      error: err => console.error(err)
    });
    console.log(this.pacientes);
  }

  // pacientesFiltrados: string = [];
  filtrarPacientes(termino: string): void {
    console.log(termino);
    this.pacientesService.buscarPacientes(termino).subscribe({
      next: data => {
        console.log(data);
        this.pacientes = data;
        // this.mensajeNoEncontrado = '';
      },
      error: err => {
        if (err.status === 404) {
          this.pacientes = [];
          // this.mensajeNoEncontrado = err.error.message; // "No se encontró ningún paciente"
        } else {
          console.error(err);
        }
      }
    });
    // this.pacientesFiltrados = this.pacientes.filter(p =>
    //   p.nombre.toLowerCase().includes(termino)
    // );
    
  }

  verDetalle(id: number) {
    console.log(id);
    this.router.navigate(['/pacientes', id]);
  }
}

