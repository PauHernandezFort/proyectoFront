import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-view',
  standalone: true,
  imports: [
    CommonModule,
    CalendarComponent
  ],
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioView {
  constructor() {
    console.log('CalendarioView inicializado'); // Para debug
  }
}

