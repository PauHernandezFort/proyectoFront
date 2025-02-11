import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendario-view',
  standalone: true,
  imports: [ CommonModule, CalendarComponent],
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class schedulesComponent {
  constructor() {
    console.log('CalendarioView inicializado'); // Para debug
  }
}