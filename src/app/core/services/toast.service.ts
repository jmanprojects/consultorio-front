import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new Subject<{ message: string, type: string, duration?: number, id:number }>();
  toast$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
    const id = Date.now();
    this.toastSubject.next({ message, type, duration, id });
  }
}
