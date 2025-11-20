import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Paciente } from '../../../core/interfaces/pacientes.interface';


@Component({
  selector: 'shared-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrl: './paciente-form.component.css'
})
export class PacienteFormComponent {
  // @Input() pacienteUpdate?: Paciente;
  @Input() pacienteUpdate?: Paciente; // Para usarlo también al editar
  @Output() submitForm = new EventEmitter<{data:Paciente, file?: File | null}>(); // Para enviar los datos al padre

  pacienteForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  ngOnInit(): void {
    this.pacienteForm = this.fb.group({
      nombre: [this.pacienteUpdate?.nombre || '', Validators.required],
      apellido: [this.pacienteUpdate?.apellido || '', Validators.required],
      telefono: [this.pacienteUpdate?.telefono || '', Validators.required],
      fecha_nacimiento: [this.pacienteUpdate?.fecha_nacimiento || '', Validators.required],
      sexo: [this.pacienteUpdate?.sexo || '', Validators.required],
      email: [this.pacienteUpdate?.email || '', [Validators.email]],
      direccion: [this.pacienteUpdate?.direccion || ''],
      foto:[null]
    });
  }
  
  // declara en la clase del componente hijo
selectedFile: File | null = null;
previewSrc: string | null = null; // opcional: para mostrar preview

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files && input.files[0] ? input.files[0] : null;
  this.selectedFile = file;

  // opcional: crear preview
  if (file) {
    const reader = new FileReader();
    reader.onload = () => this.previewSrc = reader.result as string;
    reader.readAsDataURL(file);
  } else {
    this.previewSrc = null;
  }
}


onSubmit(): void {
  if (!this.pacienteForm.valid) {
    this.pacienteForm.markAllAsTouched();
    return;
  }

  // const formData = new FormData();
  const formData = this.pacienteForm.value;
  // Añadir todos los campos del form (excepto foto)
  // Object.keys(this.pacienteForm.controls).forEach(key => {
  //   const value = this.pacienteForm.get(key)?.value;
  //   si el campo es null o undefined lo conviertes a string vacío
  //   formData.append(key, value);
  // });

  // Adjuntar la imagen solo si existe
  // if (this.selectedFile) {
  //   formData.append('foto', this.selectedFile, this.selectedFile.name);
  // }

  console.log('todavia en el form',{data: formData, imagen: this.selectedFile});

  // Emitir FormData al padre
  this.submitForm.emit({data:formData, file:this.selectedFile});

  // Opcional: reset visual del form y preview
  // this.pacienteForm.reset();
  // this.selectedFile = null;
  // this.previewSrc = null;
}

  // onSubmit(): void {
  //   if (this.pacienteForm.valid) {
  //     this.submitForm.emit(this.pacienteForm.value);
  //   }
  // }

}
