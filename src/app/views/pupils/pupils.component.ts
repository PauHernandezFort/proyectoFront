import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-pupils',
  imports: [RouterLink],
  templateUrl: './pupils.component.html',
  styleUrl: './pupils.component.css'
})
export class PupilsComponent {
  loading: { [key: string]: boolean } = {};

  constructor(private router: Router) {}

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

  editarAlumno(alumno: any) {
    // Guardar los datos del alumno en localStorage antes de navegar
    localStorage.setItem('userData', JSON.stringify(alumno));
    this.router.navigate(['/editUser']);
  }
}

