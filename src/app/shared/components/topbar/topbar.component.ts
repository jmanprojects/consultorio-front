import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'shared-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @ViewChild('menuRef') menuRef!: ElementRef;
  usuario: any;
  menu: boolean= false;

  constructor(private elementRef: ElementRef, public authService:AuthService){

  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menu = !this.menu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Si el menú no está abierto, no hacemos nada
    if (!this.menu) return;

    const menuEl = this.menuRef.nativeElement;
    console.log("estdo menu", this.menuRef.nativeElement);
    // Si el menú existe y el clic NO fue dentro del menú → cerrar
    if (menuEl) {
      console.log("cerrar menu");
      this.menu = false;
    }
  }

}
