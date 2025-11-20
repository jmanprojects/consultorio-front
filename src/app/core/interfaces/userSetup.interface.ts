
export interface StepPassword {
  password: string;
  confirmPassword: string;
}

export interface StepPersonal {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  sexo: string | null;
}

export interface StepConsultorio {
  nombre_consultorio: string;
  direccion: string;
  imagen: File | null;
}

export interface ConfigForm {
  password: StepPassword;
  personal: StepPersonal;
  consultorio: StepConsultorio;
}
