import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cards-events',
  templateUrl: './cards-events.component.html',
  styleUrls: ['./cards-events.component.css']
})
export class CardsEventsComponent {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() fecha: string = '';
  @Input() capacidad: string = '';
  @Input() event: any = {};
  @Input() nombresEntrenadores: { [key: number]: string } = {};

  @Output() eventDeleted = new EventEmitter<number>();

  // Función para manejar la eliminación del evento
  deleteEvent(eventId: number) {
    console.log(`Eliminando evento con id: ${eventId}`);
    this.eventDeleted.emit(eventId);
  }

  // Función para verificar si el evento está siendo procesado (si está en carga)
  isLoading(eventId: number): boolean {
    // Aquí deberías manejar el estado de carga de cada evento
    // Esto es solo un ejemplo
    return false; // Si no está en carga, devuelve false
  }
}