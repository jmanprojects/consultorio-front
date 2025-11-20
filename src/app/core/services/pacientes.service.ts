import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Paciente } from '../interfaces/pacientes.interface';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  private apiUrl = 'http://localhost:8000/api/patients';


  constructor(private http:HttpClient) { }
  

  // private pacientes: Paciente[] = [
  //   { id: 1, nombre: 'Ana López',  telefono: '9611234567', ultimaCita: '2025-05-04',proximaCita: '2025-09-10',fechaAlta: '2025-08-01', foto: 'assets/pacientes/ana.jpg'  },
  //   { id: 2, nombre: 'Carlos Ruiz',  telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/pedro.jpg' },
  //   { id: 3, nombre: 'Pedro Perez',  telefono: '9617654321',ultimaCita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/martin.jpg'},
  //   { id: 4, nombre: 'Martin Hernandez', telefono: '9617654321'ita: '2025-05-04',proximaCita: '2025-09-10', fechaAlta: '2025-08-15', foto: 'assets/pacientes/luis.jpg' },
  //   { id: 5, nombre: 'Luisa Lopez',  telefono: '9617654321' },
  // ];
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // O donde tengas guardado tu token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }


  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
    // return this.http.get<Paciente[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  buscarPacientes(termino: string): Observable<Paciente[]> {
    // Si tu endpoint usa query ?search=
    console.log('termino en el servicio'+termino);
    const url = `${this.apiUrl}?search=${encodeURIComponent(termino)}`;
    return this.http.get<Paciente[]>(url);
  }

  getPacienteDetalle(id: number):Observable<Paciente | undefined >{
    // const paciente = this.pacientes.find(p=> p.id === id);
    // console.log(paciente);
    // return of(paciente);

    // return this.http.get<Paciente>(`${this.apiUrl}/${id}`);
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error('Error al obtener paciente', err);
        return throwError(() => new Error('No se pudo obtener el paciente'));
      })
    );
  }


  crearPaciente(paciente: FormData): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente).pipe(
      catchError(error => {
        console.error('Error al crear paciente:', error);
        return throwError(() => error);
      })
    );
  }

  updatePaciente(id: number, pacienteData: Paciente): Observable<Paciente> {
    // console.log("en mi servicio editar paciente",pacienteData);
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, pacienteData);
    //ultimos comentarios de hoy, mandar solo datos json para actualisar ya que la imagen se enviara aparte y asi no modificamos el metodo update
    // en el back, no olvidar que marca error 404
    
  }
  
  updatePhotoPaciente(id: number, photo: FormData): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/${id}/foto`, photo);
  }



  // buscarPacientes(termino: string): Observable<Paciente[]> {
  //   return this.http.get<Paciente[]>(`${this.apiUrl}?search=${termino}`);
  // }
}

