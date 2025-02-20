import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api-service.service';
import { Clases } from '../../models/user.interface';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuarios } from '../../models/user.interface';

@Component({
  selector: 'app-classes',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css'
})
export class ClassesComponent {
  public clases: Clases[] = [];
  public id: number = 0;
  loading: { [key: number]: boolean } = {};
  public nombresEntrenadores: { [key: string]: string } = {};  // Mapa para guardar nombres de entrenadores

  constructor(private router: Router, public service: ApiService) {}

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
    if (!id || !confirm('¿Estás seguro de que deseas eliminar esta clase?')) return;
    this.loading[id] = true;
    this.service.deleteClases(id).subscribe({
      next: () => {
        this.clases = this.clases.filter(clase => clase.id && clase.id !== id);
        alert('Clase eliminada correctamente');
      },
      error: (error) => {
        console.error("Error al eliminar la clase:", error);
      },
      complete: () => {
        this.loading[id] = false;
      }
    });
  }

  // Función para saber si un alumno está en proceso de eliminación
  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }
}
