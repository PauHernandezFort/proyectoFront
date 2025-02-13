import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
      // Aquí iría la lógica de autenticación
      console.log('Formulario válido', {
        correo: this.correo,
        password: this.password
      });
      
      // Simular autenticación exitosa y guardar en localStorage
      localStorage.setItem('isUserRegistered', 'true');
      
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
