import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ApiService } from '../../services/api-service.service';
import { Clases, Usuarios } from '../../models/user.interface';
import { isSameDay, isSameMonth } from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule],
  providers: [{ provide: DateAdapter, useFactory: adapterFactory }],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @Input() locale: string = 'es';

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  userId: number = 0;
  clasesInscritas: number[] = [];

  colors = {
    verde: { primary: '#28a745', secondary: '#DFF2E1' }, // Activo
    rojo: { primary: '#dc3545', secondary: '#F8D7DA' }, // Inactivo
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadUserData();
  }

  // 🔹 Cargar usuario autenticado y obtener clases inscritas
  loadUserData(): void {
    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      try {
        const userObject: Usuarios = JSON.parse(storedUserData);
        this.userId = userObject.id ?? 0;

        console.log("📌 Usuario autenticado:", userObject);
        console.log("📌 ID del usuario autenticado:", this.userId);

        // 🔹 Verificamos si `clasesApuntadas` está vacío en `localStorage`
        if (userObject.clasesApuntadas && userObject.clasesApuntadas.length > 0) {
          this.clasesInscritas = userObject.clasesApuntadas;
          console.log("✅ Clases inscritas desde localStorage:", this.clasesInscritas);
          this.loadEvents();
        } else {
          console.warn("⚠ No hay clases inscritas en `localStorage`. Consultando API...");
          this.fetchUpdatedUserData(); // 🔹 Pedimos datos actualizados desde la API
        }
      } catch (error) {
        console.error("🚨 Error al parsear `userData` desde localStorage:", error);
      }
    } else {
      console.warn("⚠ No hay usuario autenticado.");
    }
  }

  // 🔹 Obtener usuario actualizado desde la API
  fetchUpdatedUserData() {
    this.apiService.getUser(`/api/usuarios/${this.userId}`).subscribe({
      next: (user: Usuarios) => {
        this.clasesInscritas = user.clasesApuntadas ?? [];

        if (this.clasesInscritas.length > 0) {
          console.log("✅ Clases inscritas obtenidas desde API:", this.clasesInscritas);
          this.loadEvents();
        } else {
          console.warn("⚠ El usuario no tiene clases inscritas en la API. Verificando `usuariosApuntados` en clases...");
          this.fetchClassesByEnrolledUsers();
        }
      },
      error: (error) => {
        console.error("🚨 Error al obtener datos actualizados del usuario:", error);
      }
    });
  }

  // 🔹 Si `clasesApuntadas` está vacío, buscamos clases en las que el usuario esté en `usuariosApuntados`
  fetchClassesByEnrolledUsers() {
    this.apiService.getClases().subscribe({
      next: (clases: Clases[]) => {
        this.clasesInscritas = clases
          .filter((clase) => clase.usuariosApuntados.some(user => user.id === this.userId))
          .map((clase) => clase.id ?? 0);

        if (this.clasesInscritas.length > 0) {
          console.log("✅ Clases obtenidas desde `usuariosApuntados` en la API:", this.clasesInscritas);
          this.loadEvents();
        } else {
          console.warn("⚠ No se encontraron clases inscritas para este usuario.");
        }
      },
      error: (error) => {
        console.error("🚨 Error al obtener clases desde API:", error);
      }
    });
  }

  // 🔹 Cargar eventos en el calendario
  loadEvents() {
    if (this.userId === 0) {
      console.error('🚨 No se pudo obtener el ID del usuario.');
      return;
    }

    this.apiService.getClases().subscribe({
      next: (clases: Clases[]) => {
        this.events = clases
          .filter((clase) => this.clasesInscritas.includes(clase.id ?? 0)) // 🔹 Solo clases en las que está inscrito
          .map((clase) => ({
            id: clase.id ?? `event-${clase.fecha}`, // ID único
            title: clase.ubicacion ? clase.nombre : "Clase 1", // 🔹 Si no tiene `ubicacion`, siempre "Clase 1"
            start: new Date(clase.fecha), // Fecha de inicio
            end: new Date(clase.fecha), // Fecha de fin (mismo día)
            color: this.getColorByEstado(clase.estado),
            draggable: false,
            resizable: { beforeStart: false, afterEnd: false },
            meta: { ubicacion: clase.ubicacion ?? 'Clase 1' }, // Guardamos ubicación en `meta`
          }));

        this.refresh.next(); // 🔄 Refrescar vista del calendario
      },
      error: (error) => {
        console.error('🚨 Error al cargar las clases inscritas:', error);
      }
    });
  }

  getColorByEstado(estado: string) {
    return estado.toLowerCase() === 'activo' ? this.colors.verde : this.colors.rojo;
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }

  setView(view: CalendarView): void {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !(isSameDay(this.viewDate, date) && this.activeDayIsOpen) && events.length > 0;
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(`Evento ${action}:`, event);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  trackByEventId(index: number, event: CalendarEvent): string {
    return event.id ? event.id.toString() : `event-${index}`;
  }
}
