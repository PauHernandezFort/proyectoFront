// import { Component, OnInit } from '@angular/core';
// import { CalendarOptions } from '@fullcalendar/core';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { CalendarService } from '../../service/calendar.service';
// import { ClassEvent } from '../../interface/class-model';
// import { ClassModalComponent } from "../modal/modal.component";
// import { CommonModule } from '@angular/common';
// import { FullCalendarModule } from '@fullcalendar/angular';

// @Component({
//   selector: 'app-calendar',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FullCalendarModule,
//     ClassModalComponent
//   ],
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent implements OnInit {
//   calendarOptions: CalendarOptions = {
//     plugins: [dayGridPlugin, interactionPlugin],
//     initialView: 'dayGridMonth',
//     editable: false,
//     selectable: true,
//     headerToolbar: {
//       left: 'prev,next today',
//       center: 'title',
//       right: 'dayGridMonth,dayGridWeek,dayGridDay'
//     },
//     events: [],
//     eventClick: this.handleEventClick.bind(this)
//   };

//   selectedClass: ClassEvent | null = null; // Variable para almacenar la clase seleccionada

//   constructor(private calendarService: CalendarService) {}

//   ngOnInit() {
//     this.loadEvents();
//   }

//   loadEvents() {
//     this.calendarService.getClasses().subscribe((classes: ClassEvent[]) => {
//       this.calendarOptions.events = classes.map(event => ({
//         title: event.name,
//         start: event.date,
//         color: 'yellow'
//       }));
//     });
//   }

//   handleEventClick(info: any) {
//     this.calendarService.getClassByName(info.event.title).subscribe((selectedClass) => {
//       this.selectedClass = selectedClass; // Al hacer clic en un evento, guardamos la clase seleccionada
//     });
//   }

//   closeModal() {
//     this.selectedClass = null; // Oculta el modal cuando se cierra
//   }
// }

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [], // Por ahora lo dejamos vacío
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }
  };
}

// npm install @fullcalendar/angular @fullcalendar/core @fullcalendar/daygrid @fullcalendar/interaction
