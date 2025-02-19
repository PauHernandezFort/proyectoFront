import { Component } from '@angular/core';
import { CreateEventComponent } from "../../components/forms/create-event/create-event.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CreateEventComponent, RouterLink],
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  public ubication: string = "Calle Torero Antonio Carpio, Carrer Emili Ferrer Gómez, 16 Esquina, 46470 Catarroja, Valencia";

  public abrirGoogleMaps(): void {
    const direccionElement = document.getElementById('direccion-evento');

    if (direccionElement) {
      const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.ubication)}`;
      window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
    } else {
      console.error('Elemento con id "direccion-evento" no encontrado');
    }
  }

}
