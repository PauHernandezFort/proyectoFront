import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Usuarios as Member } from '../../../models/user.interface';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editForm!: FormGroup;
  loading = false;
  id: string = '';
  photo: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // *Definir el FormGroup correctamente*
    this.editForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      fotoPerfil: new FormControl('')
    });

    if (this.id) {
      this.loading = true;
      this.apiService.getUser(1).subscribe(
        (response: Member) => {
          this.editForm.patchValue({
            nombre: response.nombre,
            apellido: response.apellido,
            telefono: response.telefono?.toString() || '',
            email: response.email,
            fotoPerfil: response.fotoPerfil || ''
          });
          this.photo = response.fotoPerfil || null;
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar los datos del usuario:', error);
          alert('No se pudo cargar el usuario');
          this.loading = false;
          this.router.navigate(['/pupils']);
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
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    this.loading = true;
    const updateData = { ...this.editForm.value };

    this.apiService.updatePupils(Number(this.id), updateData).subscribe(
      () => {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/pupils']);
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
        this.loading = false;
      }
    );
  }

  cancelar(): void {
    this.router.navigate(['/pupils']);
  }
}