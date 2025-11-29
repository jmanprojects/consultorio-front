import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://127.0.0.1:8000/api';// ajusta URL según tu entorno

  constructor(private http: HttpClient) {}

  /**
   * Cambiar contraseña en primer login.
   * Solo envía la nueva contraseña.
   */
  changePasswordFirstLogin(newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/password`, {
      newPassword
    });
  }

  /**
   * (Para futuro)
   * Cambiar contraseña en configuración normal.
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/user/password`, {
      currentPassword,
      newPassword
    });
  }


}
