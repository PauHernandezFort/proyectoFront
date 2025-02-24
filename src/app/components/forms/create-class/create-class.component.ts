import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api-service.service';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Clases, Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.css']
})
export class CreateClassComponent implements OnInit {
  createClass = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    idEntrenador: new FormControl('', { nonNullable: true }),
    capacidad: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(35)]
    }),
    estado: new FormControl('activa', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    fecha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    descripcion: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)]
    }),
  });

  public nombreEntrenador: string = '';
  public ubicaciones: string[] = [];
  public mostrarClasesDisponibles: boolean = false;
  public clasesDisponibles: Clases[] = [];
  public actividades: string[] = ['Boxeo', 'Kickboxing', 'MMA', 'Muay Thai', 'Jiu-Jitsu'];
  public ubicacion: string[] = ['C. de la Font de la Cabilda, 6C, 46470 Massanassa, Valencia'];
  public estadosClase: string[] = ['activa', 'inactiva'];
  loading = false;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getResponseClass();
    this.cargarClasesDisponibles();
    this.cargarDatosEntrenador();
  } 

  public listClass: Clases[] = [];
  public dateClass: string = "";
  public getResponseClass(): void {
    if (this.apiService.getClases()) {
      this.apiService.getClases().subscribe((response) => {
        if (response && response.length > 0) {
          this.listClass = response;
          response.forEach((clase) => {
            this.urlIdUser = clase.entrenador;
            console.log('ID del entrenador:', this.urlIdUser);
            this.dateClass = new Date(clase.fecha).toLocaleDateString('es-ES');
          });
          this.getResponsePupilsById();
        } else {
          console.log('No hay clases disponibles');
        }
      });
    } else {
      console.error("Error al obtener las clases");
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.createClass.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.createClass.get(fieldName);
    if (!field) return '';

    if (field.hasError('required')) return 'Este campo es obligatorio';
    if (field.hasError('min')) return 'La capacidad mínima es 1';
    if (field.hasError('max')) return 'La capacidad máxima es 35';
    if (field.hasError('minlength')) return 'La descripción debe tener al menos 10 caracteres';

    return '';
  }

  onSubmit(): void {
    if (this.createClass.invalid) {
      Object.keys(this.createClass.controls).forEach(key => {
        const control = this.createClass.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;
    const formValues = this.createClass.getRawValue();
    
    const fecha = new Date(formValues.fecha);
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());

    console.log('Form values:', formValues);

    const nuevaClase: Clases = {
      nombre: formValues.nombre,
      descripcion: formValues.descripcion,
      fecha: fecha,
      capacidad: formValues.capacidad,
      estado: formValues.estado,
      entrenador: formValues.idEntrenador,
      usuariosApuntados: []
    };

    console.log('Nueva clase a crear:', nuevaClase);

   this.loading = true;

this.apiService.createClass(nuevaClase).subscribe((response: any) => {
  if (response) {
    console.log('Respuesta exitosa:', response);
    alert('Clase creada exitosamente');
    this.router.navigate(['/classesPupils']);
  } else {
    console.error('Error: Respuesta vacía o nula');
    alert('Error: No se pudo crear la clase');
  }

  this.loading = false;
});

  }
  public urlIdUser: string | undefined = undefined;
  public nameClass: string = "";

  public getResponsePupilsById(): void {
    if (this.urlIdUser !== undefined) {
      this.apiService.getUser(this.urlIdUser).subscribe((usuario: Usuarios) => {
        this.nameClass = usuario.nombre;
      });
    }
  }

  private cargarClasesDisponibles(): void {
    if (this.apiService.getClases()) {
      this.apiService.getClases().subscribe((clases) => {
        if (clases && clases.length > 0) {
          this.clasesDisponibles = clases;
          console.log('Clases cargadas:', this.clasesDisponibles);
        } else {
          console.log('No hay clases disponibles');
          this.clasesDisponibles = [];
        }
      });
    } else {
      console.error('Error al cargar las clases');
      this.clasesDisponibles = [];
    }
  }

  private cargarDatosEntrenador() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.nombreEntrenador = `${user.nombre} ${user.apellido}`;
      
      if (user.id) {
        this.createClass.patchValue({
          idEntrenador: `/api/usuarios/${user.id}`
        });
      }
    }
  }
}
