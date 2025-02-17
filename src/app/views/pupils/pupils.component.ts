import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pupils',
  imports: [RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent {
  loading = false;

  eliminarAlumno() {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.loading = true;
      
      // Simulamos la eliminación con un timeout
      setTimeout(() => {
        this.loading = false;
        alert('Usuario eliminado correctamente');
        // Aquí iría la lógica para actualizar la lista de usuarios
      }, 1000);
    }
  }
}
