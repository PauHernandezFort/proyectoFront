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
  constructor(private router: Router, public service: ApiService) {}
    public clases: Clases[] = []; // Lista de usuarios
    public id: number = 0;
    loading: { [key: number]: boolean } = {}; // Cambiado de string a number
    public nombreEntrenador: string = '';  // Nueva propiedad para el nombre
   
    public getResponseClasses(): void {
      this.service.getClases().subscribe((response) => {
          if (response) {
              this.clases = response;
  
              this.service.getUser(1).subscribe((usuario: Usuarios) => {
                  if (usuario && usuario.nombre !== null && usuario.nombre !== undefined) {
                      this.nombreEntrenador = usuario.nombre;
                  } else {
                      console.error("Error: Nombre del entrenador no disponible.");
                      this.nombreEntrenador = 'No disponible';
                  }
              });
  
          } else {
              console.error("Error: No se pudieron obtener las clases.");
          }
      });
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
