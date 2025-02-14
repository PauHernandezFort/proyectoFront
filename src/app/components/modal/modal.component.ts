import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ClassModalComponent {
  @Input() classData: any;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).className === 'modal-overlay') {
      this.close();
    }
  }

  registerForClass() {
    // Aquí iría la lógica para inscribirse en la clase
    console.log('Registrando en la clase:', this.classData);
  }
} 