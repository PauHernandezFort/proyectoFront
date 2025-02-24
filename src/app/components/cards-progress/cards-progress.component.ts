import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards-progress.component.html',
  styleUrl: './cards-progress.component.css'
})
export class CardsProgressComponent {
  @Input() description: string = "";
  @Input() dateProgress: string = "";
  @Input() namePupil: string = "Alberto";
  @Input() photo = "url('https://frutasolivar.com/wp-content/uploads/2019/02/rawpixel-603025-unsplash-e1579691765526.jpg')";
  @Input() progressId: number | undefined;
  @Output() onDelete = new EventEmitter<number>();

  deleteProgress() {
    if (this.progressId) {
      this.onDelete.emit(this.progressId);
    }
  }
}
