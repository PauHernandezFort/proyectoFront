import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clases } from '../../models/user.interface';

@Component({
  selector: 'app-card-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-classes.component.html',
  styleUrl: './card-classes.component.css'
})
export class CardClassesComponent {
  @Input() clase!: Clases;
  @Input() isInscrito: boolean = false;
  @Output() onInscribirse = new EventEmitter<number>();

  inscribirse() {
    if (!this.isInscrito) {
      this.onInscribirse.emit(this.clase.id);
    }
  }
}
