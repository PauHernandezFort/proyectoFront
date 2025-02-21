import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const credentials = {
        correo: this.loginForm.value.email,
        contraseña: this.loginForm.value.password
      };

      this.apiService.loginPupil(credentials).subscribe({
        next: (response: any) => {
          console.log('Credenciales enviadas:', credentials);
          console.log('Login exitoso:', response);
          if (response && response.rol) {
            localStorage.setItem('userType', response.rol);
            localStorage.setItem('userData', JSON.stringify(response));
            this.router.navigate(['/home']);
          } else {
            alert('Respuesta del servidor inválida');
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error en el login:', error);
          alert('Error al iniciar sesión: ' + (error.error?.message || 'Credenciales incorrectas'));
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
