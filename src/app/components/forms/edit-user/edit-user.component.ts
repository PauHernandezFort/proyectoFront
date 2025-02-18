import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';

interface UserData {
  id?: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  foto: string;
  rol: string;
}

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userData: UserData = {
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    foto: '',
    rol: 'alumno'
  };
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
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
            rol: 'alumno'
          };
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar alumno:', error);
          alert('Error al cargar los datos del alumno');
          this.loading = false;
          this.router.navigate(['/pupils']);
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userData.foto = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
     /*
    if (this.validarFormulario()) {
      this.loading = true;
      this.apiService.updateUser(this.userData.id!, this.userData).subscribe(
        (response) => {
          alert('Alumno actualizado correctamente');
          this.loading = false;
          this.router.navigate(['/pupils']);
        },
        (error) => {
          console.error('Error al actualizar alumno:', error);
          alert('Error al actualizar el alumno');
          this.loading = false;
        }
      );
    }
      */
  }

  validarFormulario(): boolean {
    if (!this.userData.nombre || !this.userData.apellidos) {
      alert('El nombre y apellidos son obligatorios');
      return false;
    }

    if (!this.userData.telefono || !/^[0-9]{9}$/.test(this.userData.telefono)) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    if (!this.userData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userData.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }

  cancelar() {
    this.router.navigate(['/pupils']);
  }
} 