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
  photo: string | null = null;

  editForm = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    apellido: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    }),
    telefono: new FormControl('', {
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
          this.editForm.patchValue({
            nombre: response.nombre,
            apellido: response.apellido,
            telefono: response.telefono?.toString(),
            email: response.email,
            newPassword: '',
            fotoPerfil: response.fotoPerfil || '',
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
          fotoPerfil: this.photo,
        };

        const jsonString = JSON.stringify(imageData);
        console.log(jsonString);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    const userData: Usuarios = {
      nombre: this.editForm.getRawValue().nombre,
      apellido: this.editForm.getRawValue().apellido,
      telefono: Number(this.editForm.getRawValue().telefono),
      email: this.editForm.getRawValue().email,
      password: this.editForm.getRawValue().newPassword,
      fotoPerfil: this.photo || '',
    };
    console.log("Pepe: ", userData);

    this.updatePupils(userData);
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