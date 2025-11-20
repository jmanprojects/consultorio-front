import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'shared-toast-container',
  template: `
    <app-toast 
      *ngIf="toastData"
      [message]="toastData.message"
      [type]="toastData.type"
      [duration]="toastData.duration"
      [id]="toastData.id">
    </app-toast>
  `
})
export class ToastContainerComponent implements OnInit {
  toastData: any = null;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe(data => {
      this.toastData = data;
    });
  }
}
