import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ClassModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    ClassModalComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  selectedClass: any = null;
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [
      {
        title: 'MMA',
        date: '2024-03-20',
        color: '#4CAF50'
      },
      {
        title: 'Capoeira',
        date: '2024-03-21',
        color: '#4CAF50'
      }
      // Agrega más eventos según necesites
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    eventClick: this.handleEventClick.bind(this)
  };

  handleEventClick(info: any) {
    this.selectedClass = {
      name: info.event.title,
      date: info.event.startStr,
      time: '10:00 - 11:30',
      instructor: 'Stanly',
      availableSpots: 10
    };
  }

  closeModal() {
    this.selectedClass = null;
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }
}

// npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction