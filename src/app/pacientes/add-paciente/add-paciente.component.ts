import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { PacienteService } from '../../core/services/pacientes.service';
import { Router } from '@angular/router';
import { Paciente } from '../../core/interfaces/pacientes.interface';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'add-paciente',
  templateUrl: './add-paciente.component.html',
  styleUrl: './add-paciente.component.css'
})
export class AddPacienteComponent {
  // pacienteForm: FormGroup;
  // cargando = false;
  // errorMsg = '';

  constructor(
    // private fb: FormBuilder,
    private pacienteService: PacienteService,
    private toastService:ToastService,
    private router:Router
    // private router: Router
  ) {}


  guardarPaciente(event: {data:Paciente, file?: File | null}) {
    const {data, file} = event;
    const formData= new FormData;


        // 2. Mapear todos los campos del modelo Paciente
      // Ojo: FormData solo acepta string o Blob/File, así que convierte números a string
      Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
      });
      if (file) {
        formData.append('foto', file);
        console.log("aqui se agrega la foto");
      }else{
        formData.delete("foto");
        console.log("sin foto, quitar campo", formData);
      }
      //else{
      //   formData.append('foto', "");
      // }

      console.log('antes de enviar al server',formData);

    this.pacienteService.crearPaciente(formData).subscribe({
      next: (res) => {
        this.toastService.show(
          'Paciente registrado correctamente. Será redirigido en 3 segundos.',
          'success'
        );
      
        setTimeout(() => this.router.navigate(['/pacientes', res.id]), 3000);      
      },
      error: (err) => console.error('Error al guardar paciente:', err)
    });
  }
}
  //{
    // this.pacienteForm = this.fb.group({
    //   nombre: ['', [Validators.required]],
    //   apellido: ['', [Validators.required]],
    //   email: ['', [Validators.email]],
    //   telefono: [''],
    //   fecha_nacimiento: [''],
    //   sexo: ['', Validators.required],
    //   direccion: ['']
    // });

    // 'nombre' => 'required|string|max:255',
    //         'apellido' => 'required|string|max:255',
    //         'email' => 'nullable|email|unique:patients',
    //         'telefono' => 'nullable|string|max:20',
    //         'fecha_nacimiento' => 'nullable|date',
    //         'sexo' => 'nullable|string|in:M,F',
    //         'direccion' => 'nullable|string',
 // }

//   guardarPaciente() {
//     console.log(this.pacienteForm.value);
// // return;
//     if (this.pacienteForm.invalid) {
//       this.errorMsg = 'Por favor, completa los campos obligatorios.';
//       return;
//     }

//     this.cargando = true;
//     this.errorMsg = '';

//     this.pacienteService.crearPaciente(this.pacienteForm.value).subscribe({
//       next: (res) => {
//         this.cargando = false;
//         // Redirige a la página del paciente recién creado
//         this.router.navigate(['/pacientes', res.id]);
//       },
//       error: (err) => {
//         this.cargando = false;
//         this.errorMsg = 'Ocurrió un error al guardar el paciente.';
//         console.error(err);
//       }
//     });
//   }
//}



