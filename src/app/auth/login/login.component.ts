import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        console.log('peticion');
        // Token ya se guardó en localStorage dentro del servicio
        this.router.navigate(['/dashboard']); // redirige al dashboard
      },
      error: (err) => {
        // Muestra mensaje de error si el backend devuelve fallo
        this.errorMsg = err.error.message || 'Usuario o contraseña incorrecta';
      }
    });
  }
}
