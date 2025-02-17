import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData: User = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    foto: '',
    rol: ''
  };
  errors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      // Si no hay rol, obtenerlo del userType
      if (!this.userData.rol) {
        const userType = localStorage.getItem('userType');
        this.userData.rol = userType || 'No especificado';
      }
    } else {
      // Si no hay datos, redirigir al perfil
      this.router.navigate(['/showProfile']);
    }
  }

  validarFormulario(): boolean {
    this.errors = {};
    let isValid = true;

    // Validación del nombre
    if (!this.userData.nombre || this.userData.nombre.trim().length < 2) {
      this.errors['nombre'] = 'El nombre es obligatorio y debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación de apellidos
    if (!this.userData.apellidos || this.userData.apellidos.trim().length < 2) {
      this.errors['apellidos'] = 'Los apellidos son obligatorios y deben tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación del teléfono
    const phoneRegex = /^[0-9]{9}$/;
    if (!this.userData.telefono || !phoneRegex.test(this.userData.telefono)) {
      this.errors['telefono'] = 'El teléfono debe tener 9 dígitos';
      isValid = false;
    }

    // Validación del correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.userData.email || !emailRegex.test(this.userData.email)) {
      this.errors['email'] = 'Introduce un correo electrónico válido';
      isValid = false;
    }

    if (!isValid) {
      // Mostrar el primer error encontrado
      const firstError = Object.values(this.errors)[0];
      alert(firstError);
    }

    return isValid;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.foto = e.target.result;
        // Actualizar inmediatamente en localStorage para que el header lo detecte
        localStorage.setItem('userData', JSON.stringify(this.userData));
        // Forzar recarga del componente para actualizar la imagen
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    if (this.validarFormulario()) {
      // Guardar los cambios en localStorage
      localStorage.setItem('userData', JSON.stringify(this.userData));
      
      // Redirigir al perfil y forzar recarga para actualizar la imagen
      this.router.navigate(['/showProfile']).then(() => {
        window.location.reload();
      });
    }
  }

  cancelar() {
    // Volver al perfil sin guardar cambios
    this.router.navigate(['/showProfile']);
  }
}
