import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    
    this.apiService.loginPupil(this.credentials).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        
        // Guardar datos del usuario en localStorage
        localStorage.setItem('userData', JSON.stringify(response));
        
        // Redirigir según el rol
        switch(response.rol) {
          case 'alumno':
            this.router.navigate(['/alumno']);
            break;
          case 'entrenador':
            this.router.navigate(['/entrenador']);
            break;
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          default:
            console.error('Rol no reconocido');
            alert('Error en el rol del usuario');
        }
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Email o contraseña incorrectos');
      }
    });
  }
}
