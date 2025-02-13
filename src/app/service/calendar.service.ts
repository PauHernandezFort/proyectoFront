import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClassEvent } from '../interface/class-model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  // private apiUrl = 'http://localhost:8000/api/classes'; // Cambia por la URL de tu API

  // constructor(private http: HttpClient) {}

  // getClasses(): Observable<ClassEvent[]> {
  //   return this.http.get<ClassEvent[]>(this.apiUrl);
  // }

  // getClassByName(name: string): Observable<ClassEvent> {
  //   return this.http.get<ClassEvent>(`${this.apiUrl}/by-name/${name}`);
  // }
}
