import { NgClass, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-modal-event',
  standalone: true,
  imports: [NgClass, CommonModule, ConfirmModalComponent],
  templateUrl: './modal-event.component.html',
  styleUrl: './modal-event.component.css'
})
export class ModalEventComponent {
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() capacidad: number = 0;
  @Input() entrenador: string = '';
  @Input() ubicacion?: string = '';
  @Input() modalClass: string = "modal";
  @Input() id?: number;

  @Output() modal = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<number>();

  showConfirmModal: boolean = false;

  onClickDelete(): void {
    this.showConfirmModal = true;
  }

  onConfirmDelete(): void {
    if (this.id !== undefined) {
      console.log(`Evento con ID ${this.id} eliminado`);
      this.deleteEvent.emit(this.id);
      this.onClose();
    }
    this.showConfirmModal = false;
  }

  onCancelDelete(): void {
    this.showConfirmModal = false;
  }

  onClose(): void {
    this.modal.emit("modal");
  }
}
