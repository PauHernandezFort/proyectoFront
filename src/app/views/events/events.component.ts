import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Clases } from '../../models/user.interface';
import { ApiService } from '../../services/api-service.service';
import { CardsEventsComponent } from '../../components/cards-events/cards-events.component';
import { ModalEventComponent } from '../../components/modal-event/modal-event.component';

@Component({
  selector: 'app-events',
  imports: [RouterLink, CommonModule, CardsEventsComponent, ModalEventComponent],
  standalone: true,
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  userRole: string | null = null;
  ubicacion?: string = "";
  events: Clases[] = [];
  nombresEntrenadores: { [key: string]: string } = {};
  idEvent: number = 0;
  titulo: string = "";
  descripcion: string = "";
  loading: { [key: number]: boolean } = {};
  dateClass: string = "";
  modalClass: string = "modal";
  capacidad: number = 0;

  constructor(private apiService: ApiService) { }

  public abrirGoogleMaps(): void {
    const direccionElement = document.getElementById('direccion-evento');

    if (direccionElement && this.ubicacion) {
      const url: string = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.ubicacion)}`;
      window.open(url, '_blank'); // Abre Google Maps en una nueva pestaña
    } else {
      console.error('Elemento con id "direccion-evento" no encontrado o "ubicacion" no definida');
    }
  }

  getResponseEvents(): void {
    this.apiService.getEvent().subscribe((response) => {
      if (response) {
        this.events = response;
        this.events.forEach(clase => {
          this.dateClass = new Date(clase.fecha).toLocaleDateString('es-ES');
        });
      } else {
        console.error("Error: No se pudieron obtener las clases.");
      }
    });
  }

  ngOnInit(): void {
    this.getResponseEvents();
  }

  deleteEvent(id: number): void {
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

  handleEventDeleted(id: number) {
    this.deleteEvent(id);
  }

  onClickEvent(data: { id?: number, titulo: string, descripcion: string, capacidad: number, ubicacion?: string, fecha: string }): void {
    if (data.id !== undefined) {
      this.idEvent = data.id;
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;
      this.capacidad = data.capacidad;
      this.ubicacion = data.ubicacion;
      this.modalClass = "modal show-modal";
    }
  }

  onClose(modal: string): void {
    this.modalClass = modal;
  }

}
