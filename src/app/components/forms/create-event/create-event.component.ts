import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-create-event',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  createEvent = new FormGroup({
    eventName: new FormControl('', Validators.required),
    eventInfo: new FormControl('', Validators.required),
    eventDate: new FormControl('', Validators.required),
    eventEstate: new FormControl('', Validators.required),
    eventDirection: new FormControl('', Validators.required),
});

public ubication: string = "";

public abrirGoogleMaps(): void{
  const eventDirection = this.createEvent.value.eventDirection;
  if(eventDirection){
    const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventDirection)}`;
    window.open(url, '_blank');
  }else{
    console.error('Elemento con id "direccion-evento" no encontrado');
  }
}



constructor(public apiService: ApiServiceService) {}

onSubmit() {
  console.log('Formulario enviado');
  console.log('Validez del formulario:', this.createEvent.valid);
  
  if (this.createEvent.valid) {
    alert('Evento creado con éxito');
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


