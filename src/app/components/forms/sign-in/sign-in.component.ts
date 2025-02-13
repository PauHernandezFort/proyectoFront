import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  correo: string = '';
  password: string = '';
  errors: { [key: string]: string } = {};

  constructor(private router: Router) {}

  validarFormulario(event: Event): void {
    event.preventDefault();
    this.errors = {};
    let isValid = true;

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

    if (isValid) {
      // Simulamos que obtenemos los datos del usuario del backend
      const userData: User = {
        nombre: 'Juan',  // Estos serían los datos que vendrían del backend
        apellidos: 'Pérez García',
        email: this.correo,
        telefono: '123456789',
        foto: 'assets/images/default-profile.png' // Foto por defecto
      };
      
      // Guardar datos en localStorage
      localStorage.setItem('userType', 'alumno');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Redirigir a la página principal
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    } else {
      // Mostrar el primer error encontrado
      const firstError = Object.values(this.errors)[0];
      alert(firstError);
    }
  }

  // Método para navegar al registro
  irARegistro(): void {
    this.router.navigate(['/signUp']);
  }
}
