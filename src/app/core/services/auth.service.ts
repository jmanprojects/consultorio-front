import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Token } from '@angular/compiler';
import { BehaviorSubject,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this._loggedIn$.asObservable();
  private apiUrl: string = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { }

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('token');
    }
    return false;
  }
  

  isLoggedIn(): boolean {
    try {
      return !!localStorage.getItem('token');
    } catch {
      return false;
    }
  }
  
  
  login(email:string, password:string){
    console.log('en el servicio');
    return this.http.post<{token:string}>(`${this.apiUrl}/login`,{email, password})
    .pipe(
      tap(res => {
        console.log('si se hizo la peticion');
        localStorage.setItem('auth_token', res.token);
        this._loggedIn$.next(true);

  })
    );
  }

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

  

  // loginFake() {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     localStorage.setItem('token', 'mi-token-falso');
  //   }
  // }

  // logout() {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     localStorage.removeItem('token');
  //   }
  // }
}
