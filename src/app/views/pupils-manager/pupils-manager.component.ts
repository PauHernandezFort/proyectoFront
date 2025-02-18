import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pupils-manager',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './pupils-manager.component.html',
  styleUrl: './pupils-manager.component.css'
})
export class PupilsManagerComponent {
  loading: { [key: string]: boolean } = {};

  eliminarEntrenador(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este entrenador?')) {
      this.loading[id] = true;
      
      // Simulamos la eliminación con un timeout
      setTimeout(() => {
        this.loading[id] = false;
        alert('Entrenador eliminado correctamente');
      }, 1000);
    }
  }

  isLoading(id: string): boolean {
    return this.loading[id] || false;
  }
}
