import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
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
  @Input() nombreEntrenador: string = 'Cargando...';
  @Input() isLoading: boolean = false;
  @Output() onDelete = new EventEmitter<number>();

  deleteClase() {
    if (this.clase.id) {
      this.onDelete.emit(this.clase.id);
    }
  }
  isTraineroAdmin(): boolean {
    const userRole = localStorage.getItem('userType');
    if (userRole === "entrenador" || userRole === "admin") {
      return true;
    }
    return false;
  }
}
