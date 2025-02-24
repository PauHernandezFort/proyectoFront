import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clases } from '../../models/user.interface';
import { ApiService } from '../../services/api-service.service';

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
  @Input() nombreEntrenador: string = '';
  @Output() onInscribirse = new EventEmitter<{claseId: number, accion: 'inscribir' | 'anular'}>();
  @Output() onDelete = new EventEmitter<number>();

  userType: string = localStorage.getItem('userType') || 'alumno';
  userId: string | null = null;

  constructor(private apiService: ApiService) {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id?.toString();
    }
  }

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
    if (this.isInscrito && this.userId && this.clase.id) { //mira si el usuario esta inscrito en la clase
      this.apiService.anularInscripcion(this.userId, this.clase.id).subscribe(
        (response) => {
          if (response) {
            this.isInscrito = false;
            this.onInscribirse.emit({ claseId: this.clase.id!, accion: 'anular' }); 
            const userData = localStorage.getItem('userData');//coge los datos
            if (userData) {
              const user = JSON.parse(userData); //convierte a string
              user.clasesApuntadas = user.clasesApuntadas.filter((id: number) => id !== this.clase.id); // elimina el id de las clases apuntadas
              localStorage.setItem('userData', JSON.stringify(user)); //guarda el objeto en el localstorage
            }
          } else {
            console.error('Error al anular la inscripción');
          }
        }
      );
    } 
  }
  

  deleteClase() {
    if (this.canDeleteClass() && this.clase.id) {
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
