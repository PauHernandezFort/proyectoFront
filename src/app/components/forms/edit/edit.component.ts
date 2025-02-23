import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuarios } from '../../../models/user.interface';
import { ApiService } from '../../../services/api-service.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData: Usuarios | null = null;
  errors: { [key: string]: string } = {};
  loading = false;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
    } else {
      this.router.navigate(['/showProfile']);
    }
  }

  validarFormulario(): boolean {
    if (!this.userData) return false;
    
    this.errors = {};
    let isValid = true;

    if (!this.userData.nombre || this.userData.nombre.trim().length < 2) {
      this.errors['nombre'] = 'El nombre es obligatorio y debe tener al menos 2 caracteres';
      isValid = false;
    }

    if (!this.userData.apellido || this.userData.apellido.trim().length < 2) {
      this.errors['apellido'] = 'Los apellidos son obligatorios';
      isValid = false;
    }

    const phoneRegex = /^[0-9]{9}$/;
    if (!this.userData.telefono || !phoneRegex.test(this.userData.telefono.toString())) {
      this.errors['telefono'] = 'El teléfono debe tener 9 dígitos';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.userData.email || !emailRegex.test(this.userData.email)) {
      this.errors['email'] = 'Introduce un correo electrónico válido';
      isValid = false;
    }

    if (!isValid) {
      const firstError = Object.values(this.errors)[0];
      alert(firstError);
    }

    return isValid;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && this.userData) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (this.userData) {
          this.userData.fotoPerfil = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    if (this.validarFormulario() && this.userData) {
      this.loading = true;
      
      // Aquí iría la llamada al API para actualizar el perfil
      // Por ahora solo actualizamos el localStorage
      localStorage.setItem('userData', JSON.stringify(this.userData));
      
      this.loading = false;
      this.router.navigate(['/showProfile']).then(() => {
        window.location.reload();
      });
    }
  }

  cancelar() {
    this.router.navigate(['/showProfile']);
  }
}
