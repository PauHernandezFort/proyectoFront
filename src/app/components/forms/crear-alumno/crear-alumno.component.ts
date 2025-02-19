import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Member } from '../../../models/user.interface';

@Component({
  selector: 'app-crear-alumno',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
  /*
  nuevoAlumno: Member = {
    "@id": "",
    "@type": "Usuario",
    id: 0,
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    telefono: '',
    photo: '',
    rol: 'alumno',
    fecha_registro: new Date(),
    progresos: [],
    clases: [],
  };
  
  cargando = false;

  constructor(private apiService: ApiService, private router: Router) {}

  crearAlumno(): void {
    this.cargando = true;
    this.apiService.createPupil(this.nuevoAlumno).subscribe(() => {
      alert('Alumno creado exitosamente');
      this.cargando = false;
      this.router.navigate(['/alumnos']); 
    }, error => {
      console.error('Error al crear el alumno:', error);
      this.cargando = false;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.nuevoAlumno.photo = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
    */
}
