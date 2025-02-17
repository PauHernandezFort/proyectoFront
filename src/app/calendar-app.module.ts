import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [CalendarModule]
})
export class CalendarAppModule { }


// npm install @ng-bootstrap/ng-bootstrap angular-calendar date-fns --legacy-peer-deps
// npm install @angular/core @angular/common @angular/forms @angular/router @angular/localize angular-calendar date-fns @ng-bootstrap/ng-bootstrap angularx-flatpickr --legacy-peer-deps