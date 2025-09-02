import { Injectable } from '@angular/core';
import { Paciente } from '../interfaces/pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor() { }


  private pacientes: Paciente[] = [
    { id: 1, nombre: 'Ana López', edad: 34, telefono: '9611234567', ultimaCita: '2025-05-04',proximaCita: '2025-09-10',fechaAlta: '2025-08-01', foto: 'assets/pacientes/ana.jpg'  },
    { id: 2, nombre: 'Carlos Ruiz', edad: 42, telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/pedro.jpg' },
    { id: 2, nombre: 'Pedro Perez', edad: 42, telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/martin.jpg'},
    { id: 2, nombre: 'Martin Hernandez', edad: 42, telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/luis.jpg' },
    { id: 2, nombre: 'Luisa Lopez', edad: 42, telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/lucia.jpg' },
  ];

  getPacientes(): Paciente[] {
    return this.pacientes;
  }
}

