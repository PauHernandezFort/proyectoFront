import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-crear-entrenador',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './crear-entrenador.component.html',
  styleUrls: ['./crear-entrenador.component.css']
})
export class CrearEntrenadorComponent {
  entrenador = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    foto: '',
    rol: 'entrenador'
  };

  constructor(private apiService: ApiService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.entrenador.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.validarFormulario()) {
      // Aquí iría la lógica para enviar los datos al servidor
      this.apiService.createUser(this.entrenador).subscribe(
        (response) => {
          alert('Entrenador creado correctamente');
          // Redirigir a la lista de entrenadores
          window.location.href = '/pupilsmanager';
        },
        (error) => {
          console.error('Error al crear entrenador:', error);
          alert('Error al crear el entrenador');
        }
      );
    }
  }

  validarFormulario(): boolean {
    if (!this.entrenador.nombre || !this.entrenador.apellidos) {
      alert('El nombre y apellidos son obligatorios');
      return false;
    }

    if (!this.entrenador.telefono || !/^[0-9]{9}$/.test(this.entrenador.telefono)) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    if (!this.entrenador.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.entrenador.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }
} 