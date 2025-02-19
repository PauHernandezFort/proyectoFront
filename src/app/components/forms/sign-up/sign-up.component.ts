import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  usuario: Usuarios = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: 0,
    rol: 'alumno',
    fechaRegistro: new Date(),
    fotoPerfil: ''
  };

  confirmPassword: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.fotoPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  validarFormulario(event: Event): void {
    event.preventDefault();
    console.log('Validando formulario...');
    if (this.validarCampos()) {
      console.log('Formulario válido, registrando usuario...');
      this.registrarUsuario();
    } else {
      console.log('Formulario inválido, deteniendo registro.');
    }
  }
  

  private validarCampos(): boolean {
    if (!this.usuario.nombre || !this.usuario.apellido) {
      alert('El nombre y apellido son obligatorios');
      return false;
    }

    if (!this.usuario.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.usuario.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    if (!this.usuario.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/.test(this.usuario.password)) {
      alert('La contraseña debe tener al menos 5 caracteres, una mayúscula, una minúscula y un número');
      return false;
    }

    if (this.usuario.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return false;
    }

    if (!this.usuario.telefono || !/^[0-9]{9}$/.test(this.usuario.telefono.toString())) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    return true;
  }
 
private registrarUsuario(): void {
  const user = { 
    email: this.usuario.email, 
    password: this.usuario.password, 
    nombre: this.usuario.nombre, 
    apellido: this.usuario.apellido, 
    rol: this.usuario.rol, 
    fechaRegistro: this.usuario.fechaRegistro 
  };
  
  console.log('Registrando usuario:', this.usuario);
  
  this.apiService.registerPupil(user).subscribe((response) => {
    if (response) {
      console.log('Usuario registrado:', response);
      this.router.navigate(['/login']);
    } else {
      console.error('Error al registrar usuario');
      alert('Error al registrar el usuario');
    }
  });
}
}
