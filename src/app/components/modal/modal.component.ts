import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassEvent } from '../../interface/class-model';

@Component({
  selector: 'app-class-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ClassModalComponent {
  @Input() classData!: ClassEvent; // Recibe la clase desde el calendario
  @Output() closeModal = new EventEmitter<void>(); // Evento para cerrar el modal

  onClose() {
    this.closeModal.emit(); // Emite evento cuando se cierra
  }
}

