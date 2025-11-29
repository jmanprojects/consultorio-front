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
  
  configForm!: FormGroup;
  currentStep: number = 1;
  widthBar: number = 0;

  constructor(
    private fb: FormBuilder, 
    private wizardService: WizardService, 
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.widthBar = (this.currentStep / 4)*100;
    // 1) Obtener el step desde la URL (step-1, step-2, step-3...)
    this.route.url.subscribe(segments => {
      const last = segments[segments.length - 1]?.path; // 'step-2'
      if (last?.startsWith('step-')) {
        const step = Number(last.split('-')[1]);
        this.currentStep = step;
        console.log('currentStep desde ruta:', this.currentStep);
      }
    });

    // 2) Inicializar el form SOLO si no existe ya en el servicio
    if (this.wizardService.wizardForm) {
      // Reutilizamos el mismo formulario (con sus datos)
      this.configForm = this.wizardService.wizardForm as FormGroup;
      console.log(this.configForm);
    } else {
      // Primera vez: creamos el formulario
      this.configForm = this.fb.group({
        password: this.fb.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
        }),
        personal: this.fb.group({
          name: ['', Validators.required],
          last_name: ['', Validators.required],
          degree: ['',Validators.required],
          speciality: ['',Validators.required],
          profesional_license: ['',Validators.required],
          photo:[null]
        }),
        consultorio: this.fb.group({
          clinic_name: ['', Validators.required],
          address: ['', Validators.required],
          phone: ['', [
            Validators.required,
            Validators.pattern(/^[0-9]{10}$/) // 10 dígitos
          ]],
          clinic_logo: [null]
        })
      });

      this.wizardService.wizardForm = this.configForm;
    }

    // 3) Suscripción al "siguiente paso" del wizard
    this.wizardService.nextStep$.subscribe(() => {
      // Según el paso actual, llamamos al "submit" correspondiente
      if (this.currentStep === 1) {
        this.submitPasswordStep();
        return;
      }

      if (this.currentStep === 2) {
        this.submitPersonalStep();
        return;
      }

      if (this.currentStep === 3) {
        this.submitConsultorioStep();
        return;
      }
    });

    this.wizardService.prevStep$.subscribe(()=> {
      this.previousStep();
    });

    // console.log(this.configForm);
  }

  // Navegación entre pasos
  nextStep() {
    const next = this.currentStep + 1;
    this.currentStep = next;
    this.navigateToStep(next);
  }

  previousStep() {
    const prev = this.currentStep - 1;
    if (prev < 1) return;
    this.currentStep = prev;
    this.navigateToStep(prev);
  }

  navigateToStep(step: number) {
    this.router.navigate(['user-setup/step-' + step]);
  }

  // Paso 1: contraseña (primer login)
  submitPasswordStep() {
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

    this.userService.changePasswordFirstLogin(newPassword).subscribe({
      next: () => {
        // Si todo sale bien, avanzamos al siguiente paso
        this.wizardService.setChangePassword();
        this.nextStep();
      },
      error: (error) => {
        console.error('Error al cambiar contraseña', error);
        // Aquí podrías guardar un mensaje para mostrárselo al hijo
      }
    });
  }

  // Paso 2: datos personales
  submitPersonalStep() {
    const personalForm = this.configForm.get('personal') as FormGroup;
    if (!personalForm) return;

    if (personalForm.invalid) {
      personalForm.markAllAsTouched();
      return;
    }

    // Por ahora solo avanzamos, más adelante aquí puedes preparar payload
    this.nextStep();
  }

  // Paso 3: consultorio
  submitConsultorioStep() {
    const consultorioForm = this.configForm.get('consultorio') as FormGroup;
    if (!consultorioForm) return;

    if (consultorioForm.invalid) {
      consultorioForm.markAllAsTouched();
      return;
    }

    // Aquí ya podrías armar el payload final y mandarlo al backend
    // const payload = this.configForm.value;
    // this.userService.saveFullSetup(payload).subscribe(...)

    console.log('Wizard completo, datos finales:', this.configForm.value);
    // Por ahora solo log, tú decides qué hacer:
    // - cerrar wizard
    // - redirigir al dashboard
    // - etc.
  }

}
