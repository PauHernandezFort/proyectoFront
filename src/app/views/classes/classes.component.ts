import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
export class ClassesComponent {
  public clases: Clases[] = [];
  public id: number = 0;
  loading: { [key: number]: boolean } = {};
  public nombresEntrenadores: { [key: string]: string } = {};
  public showModal = false;
  private claseIdToDelete: number | null = null;

  constructor(public service: ApiService) { }

  public getResponseClasses(): void {
    this.service.getClases().subscribe((response) => {
      if (response) {
        this.clases = response;
        // Obtener el nombre de cada entrenador
        this.clases.forEach(clase => {
          this.obtenerNombreEntrenador(clase.idEntrenador);
        });
      } else {
        console.error("Error: No se pudieron obtener las clases.");
      }
    });
  }

  loadUserData(): void {
    if (this.id) {
      this.service.getUser(`/api/usuarios/${this.id}`).subscribe(
        (response: Usuarios) => {

        },
        (error) => {
          console.error('Error al cargar los datos del usuario:', error);
          alert('No se pudo cargar el usuario');
        }
      );
    }
  }

  public getResponsePupils(): void {
    this.service.getResponsePupils().subscribe(
      (response) => {
        response.map((member) => {
          if (member.rol !== "entrenador") {
            //this.members.push(member);
          }
        });
      },
      (error) => {
        console.error("Error al obtener los alumnos:", error);
      }
    );
  }

  private obtenerNombreEntrenador(idEntrenador: string): void {
    this.service.getUser(idEntrenador).subscribe(
      (entrenador) => {
        this.nombresEntrenadores[idEntrenador] = `${entrenador.nombre} ${entrenador.apellido}`;
      },
      (error) => {
        console.error('Error al obtener el entrenador:', error);
        this.nombresEntrenadores[idEntrenador] = 'No disponible';
      }
    );
  }

  ngOnInit(): void {
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

  isEntrenadororAdmin(): boolean {
    const userRole = localStorage.getItem('userType');
    if (userRole === "entrenador" || userRole === "admin") {
      return true;
    }
    return false;
  }
}
