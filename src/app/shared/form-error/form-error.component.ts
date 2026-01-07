import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'shared-form-error',
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {

  @Input() control!: AbstractControl | null;

  get errorMessage(): string | null {
    if (!this.control) return null;
    const control = this.control;

    // Solo mostramos error si ya fue tocado o el formulario fue enviado
    if (!control.errors || (!control.touched && !control.dirty)) {
      return null;
    }

    if (control.errors['required']) {
      return 'Este campo es obligatorio.';
    }

    // if (control.errors['email']) {
    //   return 'El formato del correo es inválido.';
    // }

    if (control.errors['pattern']) {
      return 'El formato del valor es inválido.';
    }

    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Debe tener al menos ${requiredLength} caracteres.`;
    }

    if (control.errors['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `Debe tener máximo ${requiredLength} caracteres.`;
    }

    // Aquí puedes agregar más validaciones personalizadas si las usas

    return null;
  }
}
