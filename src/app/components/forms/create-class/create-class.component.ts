import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {

  createClass = new FormGroup({
    nombre: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    id_entrenador: new FormControl<number | null>(null, { nonNullable: true, validators: [Validators.required] }),
    capacidad: new FormControl<number>(1, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(35)] }),
    estado: new FormControl('', { nonNullable: true }),
    fecha: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    descripcion: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    ubicacion: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  });

  public entrenadores: any[] = [];
  public clasesDisponibles: any[] = [];
  public ubicacionesDisponibles: string[] = [];
  public usuarioActual: any = null;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cargarEntrenadores();
    this.cargarClasesDisponibles();
    this.cargarUbicacionesDisponibles();
    this.obtenerUsuarioActual();
  }

  onSubmit(): void {
    if (this.createClass.valid) {
      const formData = this.createClass.value;
      console.log('Formulario enviado con:', formData);
      // Aquí puedes llamar a la API para enviar los datos
    } else {
      console.log('Formulario no válido');
    }
  }

  cargarEntrenadores(): void {
    this.apiService.getUser('http://52.2.202.15/api/usuarios').subscribe({
      next: (response: any) => {
        if (response && response.member) {
          this.entrenadores = response.member.filter((u: any) => u.rol === 'entrenador');
        }
      },
      error: (error: any) => {
        console.error('Error al obtener entrenadores:', error);
      }
    });
  }

  cargarClasesDisponibles(): void {
    this.apiService.getClases().subscribe({
      next: (response: unknown) => {
        const apiResponse = response as any;
        this.clasesDisponibles = apiResponse.member;
      },
      error: (error: any) => {
        console.error('Error al obtener clases disponibles:', error);
      }
    });
  }

  cargarUbicacionesDisponibles(): void {
    this.apiService.getUbicaciones().subscribe({
      next: (response: unknown) => {
        const apiResponse = response as any;
        this.ubicacionesDisponibles = apiResponse.member.map((ubicacion: any) => ubicacion.nombre);
      },
      error: (error: any) => {
        console.error('Error al obtener ubicaciones:', error);
      }
    });
  }

  obtenerUsuarioActual(): void {
    this.apiService.getCurrentUser().subscribe({
      next: (usuario: any) => {
        this.usuarioActual = usuario;
      },
      error: (error: any) => {
        console.error('Error al obtener el usuario actual:', error);
      }
    });
  }

  public mostrarClasesDisponibles: boolean = false;

}
