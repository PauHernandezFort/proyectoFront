import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
   imports: [RouterLink]
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

  constructor(private router: Router) {} 

  validarFormulario(event: Event): boolean {
    // Evitar que el formulario se envíe si hay un error
    event.preventDefault();

    // Validaciones
    if (this.nombre === "") {
      alert("Por favor, ingresa tu nombre.");
      return false;
    } else if (this.apellidos === "") {
      alert("Por favor, ingresa tus apellidos.");
      return false;
    } else if (this.telefono === "") {
      alert("Por favor, ingresa tu teléfono.");
      return false;
    } else if (this.correo === "") {
      alert("Por favor, ingresa un correo electrónico.");
      return false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.correo)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return false;
    } else if (this.password === "") {
      alert("Por favor, ingresa una contraseña.");
      return false;
    } else if (this.confirmPassword === "") {
      alert("Por favor, confirma tu contraseña.");
      return false;
    } else if (this.password !== this.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return false;
    } else if (this.rol === "") {
      alert("Por favor, selecciona un rol.");
      return false;
    } else if (!this.fotoPerfil) {
      alert("Por favor, sube una foto de perfil.");
      return false;
    }

    // Si todo está bien, enviar el formulario
    alert("Formulario enviado con éxito.");
    this.router.navigate(['/signIn']); 
    return true; 
  }
}