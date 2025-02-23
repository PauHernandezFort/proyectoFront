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
  @Input() isInscrito: boolean = false;
  @Output() onInscribirse = new EventEmitter<{claseId: number, accion: 'inscribir' | 'anular'}>();
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
  }

  inscribirse() {
    if (!this.isInscrito && this.plazasDisponibles > 0) {
      this.onInscribirse.emit({claseId: this.clase.id!, accion: 'inscribir'});
    }
  }

  anularInscripcion() {
    if (this.isInscrito) {
      this.onInscribirse.emit({claseId: this.clase.id!, accion: 'anular'});
    }
  }

  deleteClase() {
    if (this.canDeleteClass() && this.clase.id) {
      this.onDelete.emit(this.clase.id);
    }
  }
}
