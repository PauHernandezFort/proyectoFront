import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-alumno',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent {
  alumno = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    foto: ''
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.alumno.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.validarFormulario()) {
      console.log('Alumno creado:', this.alumno);
      // Aquí iría la lógica para enviar los datos al servidor
      alert('Alumno creado correctamente');
    }
  }

  validarFormulario(): boolean {
    if (!this.alumno.nombre || !this.alumno.apellidos) {
      alert('El nombre y apellidos son obligatorios');
      return false;
    }

    if (!this.alumno.telefono || !/^[0-9]{9}$/.test(this.alumno.telefono)) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    if (!this.alumno.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.alumno.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }
}
