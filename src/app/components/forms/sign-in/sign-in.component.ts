import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      console.log("📤 Enviando credenciales:", credentials);

      this.apiService.loginPupil(credentials).subscribe({
        next: (response) => {
          console.log("✅ Datos del usuario obtenidos:", response);

          // Verificar si la API devuelve usuarios en "member"
          if (response.member && response.member.length > 0) {
            // Buscar el usuario autenticado basado en el correo electrónico
            const usuarioAutenticado = response.member.find((user: Usuarios) => user.email === credentials.email);

            if (usuarioAutenticado) {
              console.log("✅ Usuario autenticado:", usuarioAutenticado);

              // Guardar el rol y los datos del usuario en el localStorage
              localStorage.setItem('userType', usuarioAutenticado.rol);
              localStorage.setItem('userData', JSON.stringify(usuarioAutenticado));

              window.dispatchEvent(new Event("storage"));

              // Redirigir según el rol
              switch (usuarioAutenticado.rol) {
                case 'alumno':
                  this.router.navigate(['/classesPupils']);
                  break;
                case 'entrenador':
                  this.router.navigate(['/classesPupils']);
                  break;
                case 'admin':
                  this.router.navigate(['/classesPupils']);
                  break;
              }
            } else {
              this.errorMessage = "🚨 Error: No se encontró un usuario con ese correo.";
            }
          } else {
            this.errorMessage = "🚨 Error: No se pudo obtener el usuario correctamente.";
          }
        },
        error: (error) => {
          console.error('🚨 Error en el login:', error);
          this.errorMessage = error.error?.error || 'Error en el servidor, intente nuevamente.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

}