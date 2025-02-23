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
<<<<<<< HEAD
  @Input() nombreEntrenador: string = 'Cargando...';
  @Input() isLoading: boolean = false;
  @Output() onDelete = new EventEmitter<number>(); // Emitir el id de la clase
  
  userType: string = localStorage.getItem('userType') || 'invitado';
  @Input() isInscrito: boolean = false;
  @Output() onInscribirse = new EventEmitter<number>();

  // Emitir el evento de eliminación
  deleteClase() {
    this.onDelete.emit(this.clase.id); // Emitir el id de la clase
=======
  @Input() isInscrito: boolean = false;
  @Output() onInscribirse = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();

  userType: string = localStorage.getItem('userType') || 'alumno';

  get alumnosInscritos(): number {
    return this.clase.usuariosApuntados?.length || 0;
  }

  get plazasDisponibles(): number {
    return this.clase.capacidad - this.alumnosInscritos;
  }

  canDeleteClass(): boolean {
    return ['entrenador', 'admin'].includes(this.userType);
>>>>>>> marcos
  }

  inscribirse() {
    if (!this.isInscrito && this.plazasDisponibles > 0) {
      this.onInscribirse.emit(this.clase.id);
    }
  }

<<<<<<< HEAD
  isTraineroAdmin(): boolean {
    const userRole = localStorage.getItem('userType');
    if (userRole === "entrenador" || userRole === "admin") {
      return true;
    }
    return false;
=======
  deleteClase() {
    if (this.canDeleteClass() && this.clase.id) {
      this.onDelete.emit(this.clase.id);
    }
>>>>>>> marcos
  }
}
