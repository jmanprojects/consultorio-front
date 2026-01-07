import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio de usuario.
 * Encapsula todas las llamadas HTTP relacionadas con el usuario:
 * - Cambio de contraseña
 * - Configuración inicial (wizard)
 * - Futuras operaciones de perfil
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * URL base de la API.
   * Idealmente debería venir de environment (environment.apiUrl),
   * pero la dejamos aquí para que funcione tal cual lo tienes ahora.
   */
  private apiUrl: string = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Cambiar contraseña en el primer login.
   * Solo envía la nueva contraseña del usuario autenticado.
   * Endpoint de ejemplo (Laravel):
   *  PATCH /api/user/password
   */
  changePasswordFirstLogin(newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/password`, {
      newPassword
    });
  }

  /**
   * Cambio de contraseña "normal" desde configuración.
   * Se envía la contraseña actual y la nueva.
   * Endpoint de ejemplo (Laravel):
   *  PATCH /api/user/password
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/password`, {
      currentPassword,
      newPassword
    });
  }

  /**
   * Guarda toda la configuración inicial del usuario (wizard completo).
   * Aquí esperamos un FormData porque incluye:
   *  - Datos personales
   *  - Datos del consultorio
   *  - Foto de usuario (File)
   *  - Logotipo de consultorio (File)
   *
   * Endpoint sugerido (Laravel):
   *  POST /api/user/setup
   *
   * En tu controlador Laravel podrás obtener:
   *  - $request->input('name'), 'last_name', 'degree', etc.
   *  - $request->file('photo'), 'clinic_logo', etc.
   */
  saveInitialSetup(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/setup`, formData);
  }

}
