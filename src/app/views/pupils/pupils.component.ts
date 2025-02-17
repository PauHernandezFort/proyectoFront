import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pupils',
  imports: [RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent {
  loading: { [key: string]: boolean } = {};


  eliminarAlumno(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      this.loading[id] = true;
      
      // Simulamos la eliminación con un timeout
      setTimeout(() => {
        this.loading[id] = false;
        alert('Alumno eliminado correctamente');
      }, 1000);
    }
  }

  isLoading(id: string): boolean {
    return this.loading[id] || false;
  }
}

