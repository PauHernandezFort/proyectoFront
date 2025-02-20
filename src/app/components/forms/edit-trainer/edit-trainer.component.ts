import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-edit-trainer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {
  public trainerData: Usuarios = {
    nombre: '',
    apellido: '',
    telefono: 0,
    email: '',
    fotoPerfil: '',
    rol: 'entrenador'
  };
  public loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loading = false;

      this.apiService.getUser(`/api/usuarios/${id}`).subscribe(
        (user: any) => {
          this.trainerData = {
            id: user.id,
            nombre: user.nombre,
            apellido: user.apellidos,
            telefono: user.telefono,
            email: user.email,
            fotoPerfil: user.foto,
            rol: 'entrenador'
          };
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar entrenador:', error);
          alert('Error al cargar los datos del entrenador');
          this.loading = false;
          this.router.navigate(['/pupilsmanager']);
        }
      );

    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.trainerData.fotoPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }


  onSubmit() {
    /*
    if (this.validarFormulario()) {
      this.loading = true;
      this.apiService.updateUser(this.trainerData.id!, this.trainerData).subscribe(
        (response) => {
          alert('Entrenador actualizado correctamente');
          this.loading = false;
          this.router.navigate(['/pupilsmanager']);
        },
        (error) => {
          console.error('Error al actualizar entrenador:', error);
          alert('Error al actualizar el entrenador');
          this.loading = false;
        }
      );
    }
      */
  }

  validarFormulario(): boolean {
    if (!this.trainerData.nombre || !this.trainerData.apellido) {
      alert('El nombre y apellidos son obligatorios');
      return false;
    }

    if (!this.trainerData.telefono || !/^[0-9]{9}$/.test(this.trainerData.telefono.toString())) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    if (!this.trainerData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.trainerData.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }

  cancelar() {
    this.router.navigate(['/pupilsmanager']);
  }
} 