import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api-service.service';
import { Member } from '../../../models/user.interface';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  reactiveForm = new FormGroup({
    name: new FormControl(''),
    finish: new FormControl(''),
  });

  memberData = {
    id: 0,
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    fotoPerfil: '',
    rol: 'alumno',
    fechaRegistro: new Date()
  };

  loading = false;
  id: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.loading = true;
      this.apiService.getUser(this.id).subscribe(response => {
        this.memberData = {
          id: response.id || 0,
          nombre: response.nombre,
          apellido: response.apellido,
          email: response.email,
          telefono: response.telefono?.toString() || '',
          fotoPerfil: response.fotoPerfil || '',
          rol: response.rol,
          fechaRegistro: response.fechaRegistro
        };
        this.loading = false;
      }, error => {
        console.error('Error al cargar los datos del usuario:', error);
        alert('No se pudo cargar el usuario');
        this.loading = false;
        this.router.navigate(['/pupils']);
      });
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.memberData.fotoPerfil = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

  updatePupils(): void {
    this.loading = true;
    const updateData = {
      ...this.memberData,
      telefono: parseInt(this.memberData.telefono) || 0
    };
    this.apiService.updatePupils(this.memberData.id, updateData).subscribe(response => {
      alert('Usuario actualizado correctamente');
      this.router.navigate(['/pupils']);
    }, error => {
      console.error('Error al actualizar el usuario:', error);
      alert('Error al actualizar el usuario');
      this.loading = false;
    });
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.updatePupils();
    }
  }

  isFormValid(): boolean {
    if (!this.memberData.nombre || !this.memberData.apellido) {
      alert('El nombre y apellido son obligatorios');
      return false;
    }

    if (!this.memberData.telefono || !/^[0-9]{9}$/.test(this.memberData.telefono)) {
      alert('Introduce un número de teléfono válido');
      return false;
    }

    if (!this.memberData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.memberData.email)) {
      alert('Introduce un correo electrónico válido');
      return false;
    }

    return true;
  }

  cancelar(): void {
    this.router.navigate(['/pupils']);
  }
}
