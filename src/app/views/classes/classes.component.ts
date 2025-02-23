import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Clases, Usuarios } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { CardClassesComponent } from '../../components/card-classes/card-classes.component';

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
  imports: [CommonModule, CardClassesComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  public clases: Clases[] = []; // Lista de clases disponibles
  public userId: number = 0; // ID del usuario autenticado
  public clasesInscritas: number[] = []; // IDs de clases en las que el usuario está inscrito

  constructor(public service: ApiService) {}

  ngOnInit(): void {
    this.getResponseClasses(); // Primero carga todas las clases
    this.loadUserData(); // Luego verifica el usuario autenticado
  }

  //  Obtener todas las clases disponibles
  public getResponseClasses(): void {
    this.service.getClases().subscribe(
      (response) => {
        console.log("📌 Clases recibidas antes del filtro:", response); // Debug
  
        //  Filtrar solo las clases que NO tengan `ubicacion`
        this.clases = response.filter(clase => !clase.ubicacion);
  
        console.log("📌 Clases filtradas (sin eventos):", this.clases); // Debug
      },
      (error) => {
        console.error("🚨 Error al obtener las clases:", error);
      }
    );
  }
  

  // Cargar usuario autenticado y obtener clases inscritas
  loadUserData(): void {
    const storedUserData = localStorage.getItem('userData');
  
    if (storedUserData) {
      try {
        const userObject: Usuarios = JSON.parse(storedUserData);
        this.userId = userObject.id ?? 0;
  
        console.log("📌 Usuario autenticado:", userObject);
        console.log("📌 ID del usuario autenticado:", this.userId);
  
        this.clasesInscritas = userObject.clasesApuntadas ?? [];
      } catch (error) {
        console.error("🚨 Error al parsear `userData` desde localStorage:", error);
      }
    } else {
      console.warn("⚠ No hay usuario autenticado.");
    }
  }
  
  // Inscribir al usuario en una clase
  public inscribirseEnClase(claseId: number): void {
    if (!this.userId) return;

    this.service.inscribirClase(this.userId.toString(), claseId).subscribe(
      () => {
        this.clasesInscritas.push(claseId); // Agregar la clase inscrita a la lista
      },
      (error) => {
        console.error("🚨 Error al inscribirse en la clase:", error);
      }
    );
  }
}
