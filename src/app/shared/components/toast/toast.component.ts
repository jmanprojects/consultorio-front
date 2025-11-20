import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' = 'info';
  @Input() duration: number = 3000; // milisegundos

  visible = false;

  ngOnInit() {
    this.show();
  }

  show() {
    this.visible = true;
    setTimeout(() => this.visible = false, this.duration);
  }

}
