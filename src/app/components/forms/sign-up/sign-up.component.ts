import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Member } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  nombre: string = '';
  apellidos: string = '';
  telefono: string = '';
  correo: string = '';
  password: string = '';
  confirmPassword: string = '';
  rol: string = '';
  fotoPerfil: File | null = null;
  fotoBase64: string = '';  // Nueva propiedad para guardar la foto en base64
  errors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  validarFormulario(event: Event): void {
    event.preventDefault();
    this.errors = {};
    let isValid = true;

    // Validación del nombre
    if (!this.nombre || this.nombre.trim().length < 2) {
      this.errors['nombre'] = 'El nombre es obligatorio y debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación de apellidos
    if (!this.apellidos || this.apellidos.trim().length < 2) {
      this.errors['apellidos'] = 'Los apellidos son obligatorios y deben tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación del teléfono
    const phoneRegex = /^[0-9]{9}$/;
    if (!this.telefono || !phoneRegex.test(this.telefono)) {
      this.errors['telefono'] = 'El teléfono debe tener 9 dígitos';
      isValid = false;
    }

    // Validación del correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.correo || !emailRegex.test(this.correo)) {
      this.errors['correo'] = 'Introduce un correo electrónico válido';
      isValid = false;
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!this.password || !passwordRegex.test(this.password)) {
      this.errors['password'] = 'La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número';
      isValid = false;
    }

    // Validación de confirmación de contraseña
    if (!this.confirmPassword || this.password !== this.confirmPassword) {
      this.errors['confirmPassword'] = 'Las contraseñas no coinciden';
      isValid = false;
    }

    // Validación del rol
    if (!this.rol) {
      this.errors['rol'] = 'Selecciona un rol';
      isValid = false;
    }

    // Validación de la foto de perfil
    if (!this.fotoPerfil) {
      this.errors['fotoPerfil'] = 'Sube una foto de perfil';
      isValid = false;
    }

    if (isValid) {
      const userData: Member = {
        nombre: this.nombre,
        apellido: this.apellidos,
        email: this.correo,
        telefono: this.telefono,
        foto: this.fotoBase64 || 'assets/images/default-profile.png', // Usar la foto subida o la default
        rol: this.rol
      };

      // Asignar el userType según el rol seleccionado
      let userType: string;
      switch (this.rol) {
        case 'entrenador':
          userType = 'entrenador';
          break;
        case 'admin':
          userType = 'admin';
          break;
        default:
          userType = 'alumno';
      }
      
      // Guardar datos en localStorage
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify(userData));

      // Redirigir a la página principal
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    } else {
      const firstError = Object.values(this.errors)[0];
      alert(firstError);
    }
  }

  // Método para manejar la subida de archivos
  onFileSelected(event: Event): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.fotoPerfil = fileList[0];
      // Convertir la foto a base64
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoBase64 = e.target.result;
      };
      reader.readAsDataURL(this.fotoPerfil);
    }
  }
}