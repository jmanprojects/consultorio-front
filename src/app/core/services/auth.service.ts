import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Token } from '@angular/compiler';
import { BehaviorSubject,tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { LoginResponse } from '../interfaces/loginResponse.interaface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this._loggedIn$.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  
  private apiUrl: string = 'http://127.0.0.1:8000/api';
  
  constructor(private http: HttpClient) { 
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('auth_token');
      if (token) {
        this._loggedIn$.next(true);
        this.restoreUserFromStorage();
      }
    }
  }

  private hasToken(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }
  

  isLoggedIn(): boolean {
    try {
      return !!localStorage.getItem('auth_token');
    } catch {
      return false;
    }
  }
  
  
  login(email:string, password:string){
    // console.log('en el servicio');
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`,{email, password})
    .pipe(
      tap(res => {
        // console.log('si se hizo la peticion');
        localStorage.setItem('auth_token', res.token);
        this.setUser(res.user);
        this._loggedIn$.next(true);

  })
    );
  }


  // ============================================
  // RESTAURAR EN REFRESH
  // ============================================
  private restoreUserFromStorage() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: User){
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    return this.userSubject.value;
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
