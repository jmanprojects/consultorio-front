import { Injectable } from '@angular/core';
import { Paciente } from '../interfaces/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }


  private pacientes: Paciente[] = [
    { id: 1, nombre: 'Ana López', edad: 34, telefono: '9611234567', fechaAlta: '2025-08-01' },
    { id: 2, nombre: 'Carlos Ruiz', edad: 42, telefono: '9617654321', fechaAlta: '2025-08-15' }
  ];

  getPacientes(): Paciente[] {
    return this.pacientes;
  }
}

