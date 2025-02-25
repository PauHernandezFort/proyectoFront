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
        const userType = localStorage.getItem('userType');

        if (userType === 'entrenador') {
          this.loadTrainerClasses(userObject);
        } else {
          // Lógica existente para alumnos
          if (userObject.clasesApuntadas && userObject.clasesApuntadas.length > 0) {
            this.clasesInscritas = userObject.clasesApuntadas;
            this.loadEvents();
          } else {
            this.fetchUpdatedUserData();
          }
        }
      } catch (error) {
        console.error("🚨 Error al parsear `userData` desde localStorage:", error);
      }
    }
  }

 // Carga las clases del entrenador y filtra las que aún no han pasado
loadTrainerClasses(entrenador: Usuarios): void {
  // Obtiene la fecha actual y establece la hora a las 00:00 para comparar solo por día
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Llama al servicio API para obtener todas las clases
  this.apiService.getClases().subscribe((clases: Clases[]) => {

    if (clases) {
      // Filtra y transforma las clases recibidas
      this.events = clases
        .filter((clase) => {
          // Divide la cadena del entrenador por '/' para obtener el ID al final
          const parts = clase.entrenador.split('/');
          const entrenadorId = parts[parts.length - 1]; // Obtiene el último elemento que es el ID

          
          const claseFecha = new Date(clase.fecha);

          // Filtra las clases que pertenecen al entrenador actual y no han pasado de dia
          return entrenadorId === entrenador.id?.toString() && claseFecha >= today;
        })
        .map((clase) => ({
          // Asigna un ID a la clase o hace uno usando la fecha
          id: clase.id ?? `event-${clase.fecha}`,

          title: clase.nombre,

          start: new Date(clase.fecha),
          end: new Date(clase.fecha),

          // Asigna un color basado en el estado de la clase
          color: this.getColorByEstado(clase.estado),

          draggable: false,

          resizable: { beforeStart: false, afterEnd: false },

  
          info: { 
            ubicacion: clase.ubicacion ?? 'Sin ubicación',
            descripcion: clase.descripcion 
          },
        }));

     
      this.refresh.next();
    } else {
     
      console.error('Error: No se pudieron cargar las clases del entrenador');
    }
  });
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.apiService.getClases().subscribe({
      next: (clases: Clases[]) => {
        this.events = clases
          .filter((clase) => {
            const claseFecha = new Date(clase.fecha);
            // Solo mostrar clases que no han pasado
            return this.clasesInscritas.includes(clase.id ?? 0) && claseFecha >= today;
          })
          .map((clase) => ({
            id: clase.id ?? `event-${clase.fecha}`,
            title: clase.nombre,
            start: new Date(clase.fecha),
            end: new Date(clase.fecha),
            color: this.getColorByEstado(clase.estado),
            draggable: false,
            resizable: { beforeStart: false, afterEnd: false },
            meta: { ubicacion: clase.ubicacion ?? 'Sin ubicación' },
          }));

        this.refresh.next();
      },
      error: (error) => {
        console.error('Error al cargar eventos:', error);
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
