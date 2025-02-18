import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from '../../../interfaces/user.interface';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public pupil: Member = {
    "@id": "",
    "@type": "",
    id: 0,
  };
  errors: { [key: string]: string } = {};
  loading = false;
  isEntrenador = false;
  entrenadorId: string = '';

  constructor(private route: Router, service: ApiService) {}

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
      this.pupil = JSON.parse(userDataString);
      // Si no hay rol, obtenerlo del userType
      if (!this.pupil.rol) {
        const userType = localStorage.getItem('userType');
        this.pupil.rol = userType || 'No especificado';
      }
    } else {
      this.router.navigate(['/showProfile']);
    }

    // Inicializa el objeto pupils con las propiedades correctas
    this.pupil = {
      "@context": "tu_contexto_aqui", // Ajusta según sea necesario
      "@id": "tu_id_aqui", // Ajusta según sea necesario
      "@type": "tu_tipo_aqui", // Ajusta según sea necesario
      totalItems: 0,
      member: [] // Inicializa como un array de Member
    };

    // Ejemplo de cómo agregar un miembro
    const newMember: Member = {
      "@id": "miembro_id_aqui",
      "@type": "miembro_tipo_aqui",
      id: 1,
      nombre: "Nombre",
      apellido: "Apellido",
      email: "email@ejemplo.com",
      password: "tu_contraseña",
      telefono: "123456789",
      rol: "rol_aqui",
      fecha_registro: new Date(),
      progresos: [],
      clases: [],
      clases_apuntadas: [],
      notificaciones: [],
      fechaRegistro: new Date(),
      clasesApuntadas: []
    };

    this.pupil.member.push(newMember); // Agrega el nuevo miembro al array
  }

  validarFormulario(): boolean {
    this.errors = {};
    let isValid = true;

    // Validación del nombre
    if (!this.pupils.nombre || this.pupils.nombre.trim().length < 2) {
      this.errors['nombre'] = 'El nombre es obligatorio y debe tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación de apellidos
    if (!this.pupils.apellido || this.pupils.apellido.trim().length < 2) {
      this.errors['apellido'] = 'Los apellidos son obligatorios y deben tener al menos 2 caracteres';
      isValid = false;
    }

    // Validación del teléfono
    const phoneRegex = /^[0-9]{9}$/;
    if (!this.pupils.telefono || !phoneRegex.test(this.pupils.telefono)) {
      this.errors['telefono'] = 'El teléfono debe tener 9 dígitos';
      isValid = false;
    }

    // Validación del correo
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.pupils.email || !emailRegex.test(this.pupils.email)) {
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
        this.pupils.foto = e.target.result;
        // Actualizar inmediatamente en localStorage para que el header lo detecte
        localStorage.setItem('userData', JSON.stringify(this.pupils));
        // Forzar recarga del componente para actualizar la imagen
        window.location.reload();
      };
      reader.readAsDataURL(file);
    }
  }

  guardarCambios() {
    if (this.validarFormulario()) {
      // Guardar los cambios en localStorage
      localStorage.setItem('userData', JSON.stringify(this.pupils));
      
      // Redirigir al perfil y forzar recarga para actualizar la imagen
      this.router.navigate(['/showProfile']).then(() => {
        window.location.reload();
      });
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
