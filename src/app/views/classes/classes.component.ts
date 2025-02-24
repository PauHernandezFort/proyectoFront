import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Clases, Usuarios } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { CardClassesComponent } from '../../components/card-classes/card-classes.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component'; // Importa el componente de confirmación
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, CardClassesComponent,RouterLink, ConfirmModalComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  public clases: Clases[] = [];
  public userId: number = 0;
  public clasesInscritas: number[] = [];
  public nombresEntrenadores: { [key: string]: string } = {};
  public showModal = false;
  public claseIdToDelete: number | null = null;
  userRole: string | null = null;
  loading: { [key: number]: boolean } = {};
  public showConfirmModal = false;
  public claseToDelete: Clases | null = null;

  constructor(public service: ApiService) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userType');
    this.getResponseClasses();
    this.loadUserData();
  }

  public getResponseClasses(): void {
    this.service.getClases().subscribe(
      (response) => {
        console.log(" Clases recibidas antes del filtro:", response); // Debug
  
        //  Filtrar solo las clases que NO tengan `ubicacion`
        this.clases = response.filter(clase => !clase.ubicacion);

        console.log("Clases filtradas (sin eventos):", this.clases); // Debug

        if (response) {
          this.clases = response;

          this.clases.map(clase => {
            this.obtenerNombreEntrenador(clase.entrenador);
          });
        } else {
          console.error("Error: No se pudieron obtener las clases.");
        }
      },
      (error) => {
        console.error("Error al obtener las clases:", error);
      }
    );
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

  loadUserData(): void {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const userObject: Usuarios = JSON.parse(storedUserData);
        this.userId = userObject.id ?? 0;
  
        console.log(" Usuario autenticado:", userObject);
        console.log(" ID del usuario autenticado:", this.userId);
  
        this.clasesInscritas = userObject.clasesApuntadas ?? [];
      } catch (error) {
        console.error(" Error al parsear `userData` desde localStorage:", error);
      }
    } else {
      console.warn(" No hay usuario autenticado.");
    }
  }

  // Inscribir al usuario en una clase
  public inscribirseEnClase(evento: {claseId: number, accion: 'inscribir' | 'anular'}) {
    if (!this.userId) return;

    const clase = this.clases.find(clase => clase.id === evento.claseId);
    if (!clase) return;

    if (evento.accion === 'inscribir') {
      this.service.inscribirClase(this.userId.toString(), evento.claseId).subscribe(
        () => {
          this.clasesInscritas.push(evento.claseId);
          if (!clase.usuariosApuntados) clase.usuariosApuntados = [];
          clase.usuariosApuntados.push(this.userId.toString());
          
          // Actualizar userData en localStorage
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          userData.clasesApuntadas = this.clasesInscritas;
          localStorage.setItem('userData', JSON.stringify(userData));
        },
        error => console.error("Error al inscribirse:", error)
      );
    } else {
      this.clasesInscritas = this.clasesInscritas.filter(id => id !== evento.claseId);
      if (clase.usuariosApuntados) {
        clase.usuariosApuntados = clase.usuariosApuntados.filter(id => id !== this.userId.toString());
      };
  }
}
isTraineroAdmin(): boolean {
  const userRole = localStorage.getItem('userType');
  if (userRole === "entrenador" || userRole === "admin") {
    return true;
  }
  return false;
}

// Añadir este método para manejar el evento de eliminar desde card-classes
onDeleteClase(claseId: number) {
  this.claseToDelete = this.clases.find(clase => clase.id === claseId) || null;
  this.showConfirmModal = true;
}

// Método para confirmar eliminación
confirmarEliminacion() {
  if (this.claseToDelete?.id) {
    this.service.deleteClases(this.claseToDelete.id).subscribe(
      () => {
        this.clases = this.clases.filter(clase => clase.id !== this.claseToDelete?.id);
        alert('Clase eliminada correctamente');
        this.showConfirmModal = false;
        this.claseToDelete = null;
      },
      error => console.error("Error al eliminar la clase:", error)
    );
  }
}

// Método para cancelar eliminación
cancelarEliminacion() {
  this.showConfirmModal = false;
  this.claseToDelete = null;
}
}