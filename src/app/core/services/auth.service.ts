// import { HttpClient, } from '@angular/common/http';
// import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http:localhost:4200/api';
  
  // constructor(private http: HttpClient) { }
  constructor(){}
  // login(email:string, password:string){
  //   return this.http.post<{token:string}>(`${this.apiUrl}/login`,{email, password})
  //   .pipe(
  //     tap(res => localStorage.setItem('token', res.token))
  //   );
  // }

  // register(name: string, email: string, password: string) {
  //   return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  // }

  // logout() {
  //   return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
  //     tap(() => localStorage.removeItem('token'))
  //   );
  // }

  // isLoggedIn(): boolean {
  //     return !!localStorage.getItem('token');
  // }

  // loginFake(){
  //   const token: string = 'token-falso-2';
  //   localStorage.setItem('token','token');
  // }

  isLoggedIn(): boolean {
    // Verifica que window y localStorage existan
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    return !!localStorage.getItem('token');
  }

  loginFake() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', 'mi-token-falso');
    }
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }
}
