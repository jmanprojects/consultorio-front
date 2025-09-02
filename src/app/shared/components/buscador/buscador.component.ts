import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shared-buscador',
  templateUrl: './buscador.component.html',
  styleUrl: './buscador.component.css'
})
export class BuscadorComponent {
  // termino: string = '';
  @Output() terminoBusqueda = new EventEmitter<string>();
  constructor(){}

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.terminoBusqueda.emit(value.trim().toLowerCase());
  }

  
}
