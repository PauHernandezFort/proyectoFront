import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Clases, Usuarios } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { CardClassesComponent } from '../../components/card-classes/card-classes.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component'; // Importa el componente de confirmación

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, CardClassesComponent, ConfirmModalComponent], // Elimina RouterLink si no es necesario
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'] // Corrige `styleUrl` a `styleUrls`
})
export class ClassesComponent implements OnInit {
  clases: Clases[] = [];
  id: number = 0;
  loading: { [key: number]: boolean } = {};
  nombresEntrenadores: { [key: string]: string } = {};
  showModal = false;
  claseIdToDelete: number | null = null;
  userRole: string | null = null;
  clasesInscritas: number[] = [];

  constructor(public service: ApiService) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userType'); // Almacena el rol del usuario
    this.getResponseClasses();
    this.loadUserData();
  }

  // Obtener todas las clases disponibles
  getResponseClasses(): void {
    this.service.getClases().subscribe((response) => {
      if (response) {
        this.clases = response.filter((clase) => !clase.ubicacion); // Filtra las clases sin ubicación
        this.clases.map((clase) => {
          this.obtenerNombreEntrenador(clase.entrenador); // Obtiene los nombres de los entrenadores
        });
      } else {
        console.error('Error: No se pudieron obtener las clases.');
      }
    });
  }

  // Obtener nombre del entrenador por ID
  obtenerNombreEntrenador(idEntrenador: string): void {
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

  // Cargar los datos del usuario
  loadUserData(): void {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const userObject: Usuarios = JSON.parse(storedUserData);
        this.clasesInscritas = userObject.clasesApuntadas ?? [];
      } catch (error) {
        console.error('Error al parsear userData desde localStorage:', error);
      }
    } else {
      console.warn('No hay usuario autenticado.');
    }
  }

  // Función para inscribirse en una clase
  public inscribirseEnClase(claseId: number): void {
    if (!this.userRole || this.userRole !== 'alumno') return; // Solo los alumnos pueden inscribirse
    this.service.inscribirClase(this.userRole, claseId).subscribe(() => {
      this.clasesInscritas.push(claseId);
    });
  }

  // Función para mostrar el modal de confirmación de eliminación
  public deleteClases(id: number): void {
    this.claseIdToDelete = id;
    this.showModal = true;
  }

  // Confirmar la eliminación
  public confirmDelete(): void {
    if (!this.claseIdToDelete) return;

    const id = this.claseIdToDelete;
    this.loading[id] = true;

    this.service.deleteClases(id).subscribe((success) => {
      this.clases = this.clases.filter(({ id: claseId }) => claseId !== id);
      alert('Clase eliminada correctamente');
      this.loading[id] = false;
      this.showModal = false;
      this.claseIdToDelete = null;
    });
  }

  // Cancelar la eliminación
  public cancelDelete(): void {
    this.showModal = false;
    this.claseIdToDelete = null;
  }

  // Función para saber si una clase está en proceso de eliminación
  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  // Verificar si el usuario es "entrenador" o "admin"
  isTraineroAdmin(): boolean {
    return this.userRole === 'entrenador' || this.userRole === 'admin';
  }
}
