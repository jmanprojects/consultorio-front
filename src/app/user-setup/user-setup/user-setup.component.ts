import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WizardService } from '../../core/services/wizard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {

  /**
   * Formulario raíz del wizard.
   * Contiene 3 grupos:
   *  - password
   *  - personal
   *  - consultorio
   */
  configForm!: FormGroup;

  /** Paso actual (1-based): 1, 2, 3... */
  currentStep: number = 1;

  /** Número total de pasos del wizard. */
  readonly totalSteps: number = 4;

  /** Getter para el porcentaje de progreso (0 a 100). */
  get progressPercent(): number {
    // Ejemplo:
    // Paso 1 -> 0%
    // Paso 2 -> 33%
    // Paso 3 -> 66%
    // Si quisieras 1 -> 33% solo cambia la fórmula.
    return ((this.currentStep - 1) / this.totalSteps) * 100;
  }

  constructor(
    private fb: FormBuilder,
    private wizardService: WizardService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {

    // 1) Detectar el paso actual desde la URL (step-1, step-2, step-3...)
    this.route.url.subscribe(segments => {
      const last = segments[segments.length - 1]?.path; // ej. 'step-2'
      if (last?.startsWith('step-')) {
        const step = Number(last.split('-')[1]);
        if (!isNaN(step)) {
          this.currentStep = step;
          // console.log('currentStep desde ruta:', this.currentStep);
        }
      }
    });

    // 2) Inicializar el form SOLO si no existe ya en el servicio
    if (this.wizardService.wizardForm) {
      // Reutilizamos el mismo formulario (con sus datos previos)
      this.configForm = this.wizardService.wizardForm as FormGroup;
    } else {
      // Primera vez: creamos el formulario raíz
      this.configForm = this.fb.group({
        password: this.fb.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        }),
        personal: this.fb.group({
          name: ['', Validators.required],
          last_name: ['', Validators.required],
          degree: ['', Validators.required],
          speciality: ['', Validators.required],
          profesional_license: ['', Validators.required],
          photo: [null] // aquí guardaremos un File (foto de usuario)
        }),
        consultorio: this.fb.group({
          clinic_name: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/) // 10 dígitos
          ]],
          clinic_logo: [null] // aquí guardaremos un File (logo)
        })
      });

      this.wizardService.wizardForm = this.configForm;
    }

    // 3) Suscribirse a eventos hijo → abuelo para avanzar
    this.wizardService.nextStep$.subscribe(() => {
      // Cualquier hijo que llame wizardService.nextStep()
      // hará que el abuelo intente avanzar respetando validaciones.
      this.nextStep();
    });

    // 4) Suscribirse a eventos hijo → abuelo para retroceder
    this.wizardService.prevStep$.subscribe(() => {
      this.previousStep();
    });
  }

  /**
   * Intenta avanzar al siguiente paso.
   * NO navega directo; primero ejecuta la lógica de validación
   * correspondiente al paso actual.
   */
  nextStep(): void {
    switch (this.currentStep) {
      case 1:
        this.submitPasswordStep();
        break;
      case 2:
        this.submitPersonalStep();
        break;
      case 3:
        this.submitConsultorioStep();
        break;
      case 4:
        this.submitFinalStep();
        break;
      default:
        break;
    }
  }

  /**
   * Retrocede un paso si es posible.
   */
  previousStep(): void {
    const prev = this.currentStep - 1;
    if (prev < 1) return;
    this.goToStep(prev);
  }

  /**
   * Navega a un paso específico del wizard
   * y actualiza currentStep.
   */
  private goToStep(step: number): void {
    if (step < 1 || step > this.totalSteps) return;
    this.currentStep = step;
    this.navigateToStep(step);
  }

  /**
   * Gestiona la navegación por rutas según el paso.
   * Ejemplo:
   *  step = 1 => /user-setup/step-1
   */
  private navigateToStep(step: number): void {
    this.router.navigate(['user-setup/step-' + step]);
  }

  // -------------------------------------------------------------------------
  // Paso 1: Cambio de contraseña (primer login)
  // -------------------------------------------------------------------------
  // private submitPasswordStep(): void {
  //   const passwordGroup = this.configForm.get('password') as FormGroup;
  //   if (!passwordGroup) return;

  //   // Validamos el grupo de contraseña
  //   if (passwordGroup.invalid) {
  //     passwordGroup.markAllAsTouched();
  //     return;
  //   }

  //   const newPassword = passwordGroup.get('password')?.value;
  //   const confirmPassword = passwordGroup.get('confirmPassword')?.value;

  //   if (!newPassword || newPassword !== confirmPassword) {
  //     console.warn('Las contraseñas no coinciden');
  //     passwordGroup.markAllAsTouched();
  //     return;
  //   }

  //   // Llamada al backend para cambiar la contraseña en primer login
  //   this.userService.changePasswordFirstLogin(newPassword).subscribe({
  //     next: () => {
  //       // Marcamos en localStorage que la contraseña ya fue cambiada
  //       this.wizardService.setChangePassword();
  //       // Avanzamos al siguiente paso
  //       const next = this.currentStep + 1;
  //       this.goToStep(next);
  //     },
  //     error: (error) => {
  //       console.error('Error al cambiar contraseña', error);
  //       // Aquí podrías manejar un mensaje de error para mostrar en el padre o hijo.
  //     }
  //   });
  // }

  private submitPasswordStep(): void {
    // Si ya cambió la contraseña en un login anterior, solo avanzamos.
    if (this.wizardService.getStatusPassword()) {
      const next = this.currentStep + 1;
      this.goToStep(next);
      return;
    }
  
    const passwordGroup = this.configForm.get('password') as FormGroup;
    if (!passwordGroup) return;
  
    // Validamos el grupo de contraseña
    if (passwordGroup.invalid) {
      passwordGroup.markAllAsTouched();
      return;
    }
  
    const newPassword = passwordGroup.get('password')?.value;
    const confirmPassword = passwordGroup.get('confirmPassword')?.value;
  
    if (!newPassword || newPassword !== confirmPassword) {
      console.warn('Las contraseñas no coinciden');
      passwordGroup.markAllAsTouched();
      return;
    }
  
    // Llamada al backend para cambiar la contraseña en primer login
    this.userService.changePasswordFirstLogin(newPassword).subscribe({
      next: () => {
        // Marcamos en localStorage que la contraseña ya fue cambiada
        this.wizardService.setChangePassword();
        // Avanzamos al siguiente paso
        const next = this.currentStep + 1;
        this.goToStep(next);
      },
      error: (error) => {
        console.error('Error al cambiar contraseña', error);
        // Aquí podrías manejar un mensaje de error para mostrar en el padre o hijo.
      }
    });
  }
  

  // -------------------------------------------------------------------------
  // Paso 2: Datos personales del médico / usuario
  // -------------------------------------------------------------------------
  private submitPersonalStep(): void {
    const personalForm = this.configForm.get('personal') as FormGroup;
    if (!personalForm) return;

    if (personalForm.invalid) {
      personalForm.markAllAsTouched();
      return;
    }

    // Si quisieras hacer algo en este punto, por ejemplo,
    // un guardado parcial, podrías llamar a un endpoint aquí.

    // Avanzar al siguiente paso (consultorio)
    const next = this.currentStep + 1;
    this.goToStep(next);
  }

  // -------------------------------------------------------------------------
  // Paso 3: avanzamos al reusmen
  // -------------------------------------------------------------------------
  private submitConsultorioStep(): void {
    const consultorioForm = this.configForm.get('consultorio') as FormGroup;
  
    if (!consultorioForm) return;
  
    if (consultorioForm.invalid) {
      consultorioForm.markAllAsTouched();
      return;
    }
  
    // Todo ok: avanzar al paso de resumen
    const next = this.currentStep + 1;
    this.goToStep(next);
  }

  private submitFinalStep(): void {
    const personalForm = this.configForm.get('personal') as FormGroup;
    const consultorioForm = this.configForm.get('consultorio') as FormGroup;
  
    if (!personalForm || !consultorioForm) return;
  
    if (personalForm.invalid || consultorioForm.invalid) {
      personalForm.markAllAsTouched();
      consultorioForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
  
    // Datos personales
    formData.append('name', personalForm.get('name')?.value);
    formData.append('last_name', personalForm.get('last_name')?.value);
    formData.append('degree', personalForm.get('degree')?.value);
    formData.append('speciality', personalForm.get('speciality')?.value);
    formData.append('profesional_license', personalForm.get('profesional_license')?.value);
  
    const photo = personalForm.get('photo')?.value;
    if (photo) {
      formData.append('photo', photo);
    }
  
    // Datos del consultorio
    formData.append('clinic_name', consultorioForm.get('clinic_name')?.value);
    formData.append('address', consultorioForm.get('address')?.value);
    formData.append('phone', consultorioForm.get('phone')?.value);
  
    const clinicLogo = consultorioForm.get('clinic_logo')?.value;
    if (clinicLogo) {
      formData.append('clinic_logo', clinicLogo);
    }
  
    this.userService.saveInitialSetup(formData).subscribe({
      next: (response) => {
        console.log('Wizard completo, datos guardados:', response);
        this.router.navigate(['/dashboard']); // ajusta si quieres otra ruta
      },
      error: (error) => {
        console.error('Error al guardar configuración inicial', error);
        // Aquí podrías manejar un mensaje de error
      }
    });
  }
  
  

}
