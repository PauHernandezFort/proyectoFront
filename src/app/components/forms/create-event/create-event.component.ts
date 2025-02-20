import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api-service.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  createEvent = new FormGroup({
    nombre: new FormControl('', Validators.required),
    capacidad: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
  });

  public ubication: string = "";

  public abrirGoogleMaps(): void {
    const eventDirection = this.createEvent.value.ubicacion;
    if (eventDirection) {
      const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventDirection)}`;
      window.open(url, '_blank');
    } else {
      console.error('Elemento con id "direccion-evento" no encontrado');
    }
  }

  constructor(public apiService: ApiService) { }

  onSubmit() {
    if (this.createEvent.valid) {
      const formData = this.createEvent.value;
      // Transformar formData a formato LD-JSON
      const ldJsonData = {
        "nombre": formData.nombre || '',
        "capacidad": Number(formData.capacidad) || 0,
        "estado": formData.estado || '',
        "fecha": new Date(formData.fecha || ''),
        "descripcion": formData.descripcion || '',
        "ubicacion": formData.ubicacion || '',
        "usuariosApuntados": []
      };

      // Mostrar los datos transformados en formato LD-JSON
      console.log('Datos transformados a LD-JSON:', JSON.stringify(ldJsonData));

      // Enviar los datos al backend
      this.apiService.createClass(ldJsonData).subscribe({
        next: (response) => {
          console.log('Evento creada con éxito:', response);
          alert('EVneto creada con éxito');
          this.createEvent.reset();
        },
        error: (error) => {
          console.error('Error al crear el evento:', error);
          console.log('Detalles del error:', {
            message: error.message,
            status: error.status,
            url: error.url
          });
          alert('Hubo un error al crear el evento');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
  /*
  onSubmit2() {
    if(this.createEvent.valid){
      const formData = this.createEvent.value;
      this.apiService.createEvent(formData).subscribe({
        next: (response) => {
          console.log('Evento creado:', response);
          alert('Evento creado con éxito');
        },
        error: (error) => {
          console.error('Error al crear el evento:', error);
          alert('Hubo un error al crear el evento');
        }
      });
    }
  }
  */
}


  