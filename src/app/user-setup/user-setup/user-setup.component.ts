import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigForm } from '../../core/interfaces/userSetup.interface';
import { WizardService } from '../../core/services/wizard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent {
  
  configForm!: FormGroup;
  currentStep: number = 1;


  constructor(private fb: FormBuilder, private wizardService:WizardService, private router:Router) {}

  ngOnInit() {

    this.configForm = this.fb.group({
      password: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }),
      personal: this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: [''],
        fecha_nacimiento: [''],
        sexo: [null] // no obligatorio
      }),
      consultorio: this.fb.group({
        nombre_consultorio: ['', Validators.required],
        direccion: [''],
        imagen: [null]
      })
    });
    
    this.wizardService.wizardForm = this.configForm;

    // this.configForm.valueChanges.subscribe(val => {
      
    // });

    this.wizardService.nextStep$.subscribe(()=>{
      console.log("vamos al otro paso");
      this.nextStep();
      // this.router.navigate(['user-setup/step-2']);

    });

    // this.navigateToStep(this.currentStep);
  }

  nextStep() {
    this.currentStep++;
    this.navigateToStep(this.currentStep);
  }

  previousStep() {
    this.currentStep--;
    this.navigateToStep(this.currentStep);
  }

  navigateToStep(step: number) {
    this.router.navigate(['user-setup/step-'+step]);
  }

  // onSubmit() {
  //   if (this.configForm.valid) {
  //     console.log(this.configForm.value);
  //     // Aquí envías la data al backend
  //   }
  // }

  //Validator para que nueva contraseña y confirmación coincidan
  // passwordMatchValidator(group: FormGroup) {
  //   const newPass = group.get('newPassword')?.value;
  //   const confirm = group.get('confirmPassword')?.value;
  //   return newPass === confirm ? null : { mismatch: true };
  // }

  //Para obtener los FormGroups de cada step más fácil
  // get passwordStep() { return this.configForm?.get('password') as FormGroup; }
  // get personalStep() { return this.configForm?.get('personal') as FormGroup; }
  // get consultorioStep() { return this.configForm?.get('consultorio') as FormGroup; }

  // Enviar datos
  // onSubmit(): void {
  //   if (this.configForm.valid) {
  //     console.log(this.userSetupForm.value);
  //     // Aquí llamarías al servicio para guardar la info
  //   } else {
  //     this.userSetupForm.markAllAsTouched();
  //   }
  // }

}
