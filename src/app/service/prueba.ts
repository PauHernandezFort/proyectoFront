import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//falta importar el modulo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Métodos de autenticación
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, userData);
  }

  // Métodos de usuarios
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/profile`, { headers: this.getHeaders() });
  }

  updateProfile(userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/profile`, userData, { headers: this.getHeaders() });
  }

  // Métodos de clases
  getAllClasses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes`, { headers: this.getHeaders() });
  }

  getClassById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/classes/${id}`, { headers: this.getHeaders() });
  }

  createClass(classData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/classes`, classData, { headers: this.getHeaders() });
  }

  updateClass(id: string, classData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/classes/${id}`, classData, { headers: this.getHeaders() });
  }

  deleteClass(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/classes/${id}`, { headers: this.getHeaders() });
  }

  // Métodos de alumnos
  getAllStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`, { headers: this.getHeaders() });
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/students/${id}`, { headers: this.getHeaders() });
  }

  // Métodos de progreso
  getStudentProgress(studentId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/progress/${studentId}`, { headers: this.getHeaders() });
  }

  createProgress(progressData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/progress`, progressData, { headers: this.getHeaders() });
  }

  updateProgress(progressId: string, progressData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/progress/${progressId}`, progressData, { headers: this.getHeaders() });
  }

  // Métodos de eventos
  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/events`, { headers: this.getHeaders() });
  }

  createEvent(eventData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events`, eventData, { headers: this.getHeaders() });
  }

  updateEvent(eventId: string, eventData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/events/${eventId}`, eventData, { headers: this.getHeaders() });
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/events/${eventId}`, { headers: this.getHeaders() });
  }

  private apiUrlMoney: string = 'aqui pondremos la url de la peticion de la apli';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }
}
