



import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-edit-trainer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-trainer.component.html',
  styleUrls: ['./edit-trainer.component.css']
})
export class EditTrainerComponent implements OnInit {

  id: string = "";
  photo: string | null = "";
  imageData: { id: number, fotoPerfil: string } = { id: 0, fotoPerfil: "" };

  editFormTrainer = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    surname: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('[0-9]{9}')]
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    newPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)]
    }),
    fotoPerfil: new FormControl('', { nonNullable: true })
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadUserData();
  }

  loadUserData(): void {
    if (this.id) {
      this.apiService.getUser(`/api/usuarios/${this.id}`).subscribe(
        (response: Usuarios) => {
          this.editFormTrainer.patchValue({
            name: response.nombre,
            surname: response.apellido,
            phone: response.telefono?.toString(),
            email: response.email,
            newPassword: '',
          });

          this.photo = response.fotoPerfil || null;
        },
        (error) => {
          console.error('Error al cargar los datos del usuario:', error);
          alert('No se pudo cargar el usuario');
        }
      );
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.photo = reader.result as string;
        this.editFormTrainer.patchValue({ fotoPerfil: this.photo });

        const imageData = {
          id: Number(this.id),
          fotoPerfil: this.photo,
        };

        this.imageData = imageData;
        this.updateUserPhoto(this.imageData);
      };
      reader.readAsDataURL(file);
    }
  }

  updateUserPhoto(imageData: { id: number; fotoPerfil: string }): void {
    this.apiService.updatePhotoUser(imageData).subscribe(
      (response) => {
        console.log(response.ruta);
      },
      (error) => {
        console.error('Error al actualizar la foto de perfil:', error);
        alert('Error al actualizar la foto de perfil');
      }
    );
  }

  onSubmit(): void {
    if (this.validarFormulario()) {
      if (this.editFormTrainer.getRawValue().newPassword === this.editFormTrainer.getRawValue().confirmPassword) {
        const userData: Usuarios = {
          nombre: this.editFormTrainer.getRawValue().name,
          apellido: this.editFormTrainer.getRawValue().surname,
          telefono: Number(this.editFormTrainer.getRawValue().phone),
          email: this.editFormTrainer.getRawValue().email,
          password: this.editFormTrainer.getRawValue().newPassword,
        };
        this.updateTrainers(userData);
      } else {
        alert('Las contraseñas no coinciden');
      }
    }
  }

  public updateTrainers(userData: Usuarios): void {
    this.apiService.updatePupils(Number(this.id), userData).subscribe(
      () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/pupilsmanager']);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
      }
    );
  }


  validarFormulario(): boolean {
    if (!this.editFormTrainer.getRawValue().name || !this.editFormTrainer.getRawValue().surname) {
      alert('El nombre y apellidos son obligatorios');
      return false;
    }

    if (!this.editFormTrainer.getRawValue().phone || !/^[0-9]{9}$/.test(this.editFormTrainer.getRawValue().phone.toString())) {
      alert('Introduce un número de teléfono válido (9 dígitos)');
      return false;
    }

    if (!this.editFormTrainer.getRawValue().email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editFormTrainer.getRawValue().email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }

  cancelar(): void {
    this.router.navigate(['/pupilsmanager']);
  }


} 