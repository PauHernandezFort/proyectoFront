import { Component } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { Clases, Usuarios } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { CardClassesComponent } from '../../components/card-classes/card-classes.component';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal.component'; // Importa el componente de confirmación

@Component({
  selector: 'app-classes',
  standalone: true,
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
