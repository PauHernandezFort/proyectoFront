import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id: string = "";
  photo: string | null = "";
  imageData: { id: number, fotoPerfil: string } = { id: 0, fotoPerfil: "" };

  editForm = new FormGroup({
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
    console.log(this.id);
    if (this.id) {
      this.apiService.getUser(`/api/usuarios/${this.id}`).subscribe(
        (response: Usuarios) => {
          this.editForm.patchValue({
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
        this.editForm.patchValue({ fotoPerfil: this.photo });

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
    if (this.editForm.getRawValue().newPassword === this.editForm.getRawValue().confirmPassword) {
      const userData: Usuarios = {
        nombre: this.editForm.getRawValue().name,
        apellido: this.editForm.getRawValue().surname,
        telefono: Number(this.editForm.getRawValue().phone),
        email: this.editForm.getRawValue().email,
        password: this.editForm.getRawValue().newPassword,
      };
      this.updatePupils(userData);
    } else {
      alert('Las contraseñas no coinciden');
    }
  }

  public updatePupils(userData: Usuarios): void {
    this.apiService.updatePupils(Number(this.id), userData).subscribe(
      () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/pupils']);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/pupils']);
  }

  getControl(controlName: string) {
    return this.editForm.get(controlName);
  }
}