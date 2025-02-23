import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Clases } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';
import { CardClassesComponent } from '../../components/card-classes/card-classes.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, RouterLink, CardClassesComponent, ConfirmModalComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent implements OnInit {
  clases: Clases[] = [];
  id: number = 0;
  loading: { [key: number]: boolean } = {};
  nombresEntrenadores: { [key: string]: string } = {};
  showModal = false;
  claseIdToDelete: number | null = null;
  userRole: string | null = null;
  constructor(public service: ApiService) { }

  getResponseClasses(): void {
    this.service.getClases().subscribe((response) => {
      if (response) {
        this.clases = response;

        this.clases.map(clase => {
          this.obtenerNombreEntrenador(clase.entrenador);
        });
      } else {
        console.error("Error: No se pudieron obtener las clases.");
      }
    });
  }

  obtenerNombreEntrenador(idEntrenador: string): void {
    console.log(idEntrenador);
    this.service.getUser(idEntrenador).subscribe(
      (entrenador) => {
        this.nombresEntrenadores[idEntrenador] = `${entrenador.nombre} ${entrenador.apellido}`;
        console.log(this.nombresEntrenadores[idEntrenador]);
      },
      (error) => {
        console.error('Error al obtener el entrenador:', error);
        this.nombresEntrenadores[idEntrenador] = 'No disponible';
      }
    );
  }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userType');
    this.getResponseClasses();
  }

  public deleteClases(id: number): void {
    this.claseIdToDelete = id;
    this.showModal = true;
  }

  public confirmDelete(): void {
    if (!this.claseIdToDelete) return;

    const id = this.claseIdToDelete;
    this.loading[id] = true;

    this.service.deleteClases(id).subscribe((success) => {
      if (this.service) {
        this.clases = this.clases.filter(({ id: clases }) => clases !== id);
        alert('Alumno eliminado correctamente');
      } else {
        alert('Error al eliminar el alumno');
      }
      this.loading[id] = false;
      this.showModal = false;
      this.claseIdToDelete = null;
    });
  }


  public cancelDelete(): void {
    this.showModal = false;
    this.claseIdToDelete = null;
  }

  // Función para saber si un alumno está en proceso de eliminación
  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  isTraineroAdmin(): boolean {
    const userRole = localStorage.getItem('userType');
    if (userRole === "entrenador" || userRole === "admin") {
      return true;
    }
    return false;
  }
}
