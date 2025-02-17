import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../../services/api-service.service';

// Definimos la interfaz User que coincida con el servicio API
interface UserData {
  id?: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  foto: string;
  rol: string;
}

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData: UserData = {
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    foto: '',
    rol: ''
  };
  errors: { [key: string]: string } = {};
  loading = false;
  isEntrenador = false;
  entrenadorId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiServiceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEntrenador = true;
      this.entrenadorId = id;
      this.cargarDatosEntrenador(id);
    } else {
      this.cargarDatosPerfil();
    }
  }

  cargarDatosEntrenador(id: string) {
    this.loading = true;
    this.apiService.getUser(id).subscribe(
      (user: any) => {
        this.userData = {
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos,
          telefono: user.telefono,
          email: user.email,
          foto: user.foto,
          rol: user.rol
        };
        this.loading = false;
      },
      (error) => {
        alert('Error al cargar los datos del entrenador');
        this.loading = false;
      }
    );
  }

  cargarDatosPerfil() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      this.userData = JSON.parse(userDataString);
      if (!this.userData.rol) {
        const userType = localStorage.getItem('userType');
        this.userData.rol = userType || 'No especificado';
      }
    } else {
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
      if (this.isEntrenador) {
        this.loading = true;
        const updateData = {
          nombre: this.userData.nombre,
          apellidos: this.userData.apellidos,
          telefono: this.userData.telefono,
          email: this.userData.email,
          foto: this.userData.foto,
          rol: this.userData.rol
        };
        
        this.apiService.updateUser(this.entrenadorId, updateData).subscribe(
          () => {
            alert('Entrenador actualizado correctamente');
            this.router.navigate(['/pupilsmanager']);
          },
          (error) => {
            alert('Error al actualizar el entrenador');
            this.loading = false;
          }
        );
      } else {
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.router.navigate(['/showProfile']).then(() => {
          window.location.reload();
        });
      }
    }
  }

  cancelar() {
    if (this.isEntrenador) {
      this.router.navigate(['/pupilsmanager']);
    } else {
      this.router.navigate(['/showProfile']);
    }
  }
}
