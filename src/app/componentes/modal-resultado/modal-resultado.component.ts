import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-resultado',
  templateUrl: './modal-resultado.component.html',
  styleUrl: './modal-resultado.component.scss'
})
export class ModalResultadoComponent {
  @Input() mostrar: boolean = false;
  @Input() titulo: string = '¡Juego Terminado!';
  @Input() puntaje: number = 0;
  @Input() correctas: number = 0;
  @Input() racha: number = 0;
  @Input() categorias: number = 0;

  @Output() volver = new EventEmitter<void>();
  @Output() reiniciar = new EventEmitter<void>();
}
