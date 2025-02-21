import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Clases, Usuarios } from '../../../models/user.interface';

@Component({
  selector: 'app-create-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  constructor(public apiService: ApiService, private router: Router) { }
   
  createEvent = new FormGroup({
     nombre: new FormControl('', { 
       nonNullable: true, 
       validators: [Validators.required] 
     }),
     idEntrenador: new FormControl('/api/entrenadors/1', { nonNullable: true }),
     capacidad: new FormControl<number>(1, { 
       nonNullable: true, 
       validators: [Validators.required, Validators.min(1), Validators.max(35)] 
     }),
     estado: new FormControl('', { 
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
     ubicacion: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(500)] 
    }),
   });

   public abrirGoogleMaps(): void {
     const eventDirection = this.createEvent.value.ubicacion;
     if (eventDirection) {
       const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventDirection)}`;
       window.open(url, '_blank');
     } else {
       console.error('Elemento con id "direccion-evento" no encontrado');
     }
   }
 
   public nombreEntrenador: string = '';
   public ubicaciones: string[] = [];
   public mostrarClasesDisponibles: boolean = false;
   public eventosDisponibles: Clases[] = [];
   public actividades: string = "";
   public estadosClase: string[] = ['activa', 'inactiva'];
   loading = false;
   ngOnInit(): void {
    this.getResponseClass();
   } 
 
   public listClass: Clases[] = [];
   public dateClass: string = "";
     public getResponseClass(): void {
     this.apiService.getClases().subscribe(
     (response) => {
       this.listClass = response;
       response.forEach((clase) => {
         this.urlIdUser = clase.idEntrenador;
         console.log('ID del entrenador:', this.urlIdUser);
         this.dateClass = new Date(clase.fecha).toLocaleDateString('es-ES');
         this.obtenerNombreEntrenador(clase.idEntrenador);
       });
       this.getResponsePupilsById();
     },
     (error) => {
       console.error("Error al obtener el evento:", error);
     }
   );
 }
 
   isFieldInvalid(fieldName: string): boolean {
     const field = this.createEvent.get(fieldName);
     return field ? field.invalid && (field.dirty || field.touched) : false;
   }
 
   getErrorMessage(fieldName: string): string {
     const field = this.createEvent.get(fieldName);
     if (!field) return '';
 
     if (field.hasError('required')) return 'Este campo es obligatorio';
     if (field.hasError('min')) return 'La capacidad mínima es 1';
     if (field.hasError('max')) return 'La capacidad máxima es 5000';
     if (field.hasError('minlength')) return 'La descripción debe tener al menos 10 caracteres';
     
     return '';
   }
 
   onSubmit(): void {
     if (this.createEvent.invalid) {
       Object.keys(this.createEvent.controls).forEach(key => {
         const control = this.createEvent.get(key);
         if (control) {
           control.markAsTouched();
         }
       });
       return;
     }
 
     this.loading = true;
     const formValues = this.createEvent.getRawValue();
     const nuevoEvento: Clases = {
       nombre: formValues.nombre,
       descripcion: formValues.descripcion,
       fecha: new Date(formValues.fecha),
       capacidad: formValues.capacidad,
       estado: formValues.estado,
       idEntrenador: '/api/usuarios/1',
       usuariosApuntados: []
     };
 
     this.apiService.createEvent(nuevoEvento).subscribe(response => {
       if (response) {
         alert('evento creada exitosamente');
         this.router.navigate(['/events']);
       } else {
         console.error('Error: Respuesta vacía o no válida.');
         alert('Error al crear el evento');
       }
       
       this.loading = false;
     }, error => {
       console.error('Error al crear el evento:', error);
       alert('Error al crear el evento');
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
 
   private obtenerNombreEntrenador(idEntrenador: string): void {
     this.apiService.getUser(idEntrenador).subscribe(
       (entrenador) => {
         this.nombreEntrenador = `${entrenador.nombre} ${entrenador.apellido}`;
         console.log('Nombre del entrenador:', this.nombreEntrenador);
       },
       (error) => {
         console.error('Error al obtener el entrenador:', error);
       }
     );
   }
 }


  