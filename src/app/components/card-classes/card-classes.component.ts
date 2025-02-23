import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clases } from '../../models/user.interface';

@Component({
  selector: 'app-card-classes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-classes.component.html',
  styleUrls: ['./card-classes.component.css']
})
export class CardClassesComponent {
  @Input() clase!: Clases;
  @Input() nombreEntrenador: string = 'Cargando...';
  @Input() isLoading: boolean = false;
  @Output() onDelete = new EventEmitter<number>(); // Emitir el id de la clase
  
  userType: string = localStorage.getItem('userType') || 'invitado';
  @Input() isInscrito: boolean = false;
  @Output() onInscribirse = new EventEmitter<number>();

  // Emitir el evento de eliminación
  deleteClase() {
    this.onDelete.emit(this.clase.id); // Emitir el id de la clase
  }

  inscribirse() {
    if (!this.isInscrito) {
      this.onInscribirse.emit(this.clase.id);
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
