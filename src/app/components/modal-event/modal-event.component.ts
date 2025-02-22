import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-event',
  imports: [NgClass],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() capacidad: number = 0;
  @Input() entrenador: string = '';
  @Input() ubicacion: string = '';
  @Input() modalClass: string = "modal";
  @Input() event: any = {};
  @Input() id?: number;
  @Input() nombresEntrenadores: { [key: number]: string } = {};
  @Output() modal = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<number>();

  onClickDelete(): void {
    if (this.id !== undefined) {
      console.log(`Evento con ID ${this.id} eliminado`);
      this.deleteEvent.emit(this.id);
    }
  }

  onClose(): void {
    this.modal.emit("modal");
  }
}
