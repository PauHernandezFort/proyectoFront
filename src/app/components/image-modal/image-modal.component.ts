import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent {
  @Input() imageUrl: string = '';
  @Input() imageTitle: string = '';
  @Input() imageDescription: string = '';
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).className === 'image-modal-overlay') {
      this.close();
    }
  }
} 