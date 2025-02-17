import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, Output, EventEmitter, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { startOfDay, endOfDay, isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

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
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @Input() locale: string = 'es';
  @Output() eventClicked = new EventEmitter<{ action: string; event: CalendarEvent }>();
  @Output() eventAdded = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<CalendarEvent>();
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  colors = {
    rojo: { primary: '#ad2121', secondary: '#FAE3E3' },
    azul: { primary: '#1e90ff', secondary: '#D1E8FF' },
    amarillo: { primary: '#e3bc08', secondary: '#FDF1BA' },
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Editar',
      onClick: ({ event }: { event: CalendarEvent }) => this.handleEvent('Editado', event),
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Eliminar',
      onClick: ({ event }: { event: CalendarEvent }) => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Eliminado', event);
        this.eventDeleted.emit(event);
      },
    },
  ];

  modalData: { action: string; event: CalendarEvent } | undefined;

  ngOnInit() {
    this.events = [
      {
        title: 'Evento de prueba',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: this.colors.azul,
        draggable: true,
      },
    ];
  }

  trackEvent(index: number, event: CalendarEvent): string {
    return event.id ? event.id.toString() : index.toString();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !(isSameDay(this.viewDate, date) && this.activeDayIsOpen) && events.length > 0;
      this.viewDate = date;
      this.viewDateChange.emit(date);
    }
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => (iEvent === event ? { ...event, start: newStart, end: newEnd } : iEvent));
    this.refresh.next();
    this.eventUpdated.emit({ ...event, start: newStart, end: newEnd });
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { action, event };
    this.eventClicked.emit({ action, event });
  }

  addEvent(): void {
    const newEvent: CalendarEvent = {
      title: 'Nuevo evento',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: this.colors.rojo,
      draggable: true,
      resizable: { beforeStart: true, afterEnd: true },
    };
    this.events = [...this.events, newEvent];
    this.eventAdded.emit(newEvent);
  }

  deleteEvent(eventToDelete: CalendarEvent): void {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.eventDeleted.emit(eventToDelete);
  }

  setView(view: CalendarView): void {
    this.view = view;
    this.viewChange.emit(view);
  }

  closeOpenMonthViewDay(): void {
    this.activeDayIsOpen = false;
  }
}