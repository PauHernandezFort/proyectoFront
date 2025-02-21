import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Clases } from '../../models/user.interface';
import { ApiService } from '../../services/api-service.service';
import { CardsEventsComponent } from '../../components/cards-events/cards-events.component';

@Component({
  selector: 'app-events',
  imports: [RouterLink, CommonModule, CardsEventsComponent],
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  public userRole: string | null = null;
  public ubication: string = "Calle Torero Antonio Carpio, Carrer Emili Ferrer Gómez, 16 Esquina, 46470 Catarroja, Valencia";
  public events: Clases[] = [];
  public nombresEntrenadores: { [key: string]: string } = {};
  loading: { [key: number]: boolean } = {};

  constructor(private apiService: ApiService) { }
  
  public abrirGoogleMaps(): void {
    const direccionElement = document.getElementById('direccion-evento');

    if (direccionElement) {
      const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.ubication)}`;
      window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
    } else {
      console.error('Elemento con id "direccion-evento" no encontrado');
    }
  }

  public getResponseEvents(): void {
    this.apiService.getEvent().subscribe((response) => {
      if (response) {
        this.events = response;
        // Obtener el nombre de cada entrenador
        this.events.forEach(clase => {
          this.obtenerNombreEntrenador(clase.idEntrenador);
        });
      } else {
        console.error("Error: No se pudieron obtener las clases.");
      }
    });
  }

  private obtenerNombreEntrenador(idEntrenador: string): void {
    this.apiService.getUser(idEntrenador).subscribe(
      (entrenador) => {
        this.nombresEntrenadores[idEntrenador] = `${entrenador.nombre} ${entrenador.apellido}`;
      },
      (error) => {
        console.error('Error al obtener el entrenador:', error);
        this.nombresEntrenadores[idEntrenador] = 'No disponible';
      }
    );
  }
  ngOnInit(): void {
    this.getResponseEvents();
  }

  public deleteEvent(id: number): void {
    if (!id || !confirm('¿Estás seguro de que deseas eliminar esta clase?')) return;
    this.loading[id] = true;
    this.apiService.deleteClases(id).subscribe({
      next: () => {
        this.events = this.events.filter(clase => clase.id && clase.id !== id);
        alert('Clase eliminada correctamente');
      },
      error: (error) => {
        console.error("Error al eliminar la clase:", error);
      },
      complete: () => {
        this.loading[id] = false;
      }
    });
  }

  isLoading(id: number): boolean {
    return this.loading[id] || false;
  }

  handleEventDeleted(eventId: number) {
    console.log(`Evento con id ${eventId} ha sido eliminado`);
    // Aquí puedes realizar la lógica para eliminar el evento del array o base de datos
  }

}
