import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pupils } from '../interfaces/user.interface';

interface ClassData {
  activity: string;
  date: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  description: string;
  level: string;
}

export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlClass = 'http://localhost:3000/api/classes';
  private apiUrlUsers = 'http://localhost:3000/api/users'; // URL para usuarios

  constructor(public http: HttpClient) { }

  public getResponsePupils(url: string): Observable<Pupils> {
    return this.http.get<Pupils>(url);
  }


  /*
  private apiUrl = 'aquí pondremos la url de la API';
  createClass(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
  
  private apiUrlEvents: string = 'aqui pondremos la url de la peticion de la apli'
  createEvent(data: any): Observable<any> {
    return this.http.post(this.apiUrlEvents, data);
  
  
  }
  
  private apiUrlEnroll: string = 'aqui pondremos la url de la peticion de la apli';
  
  Enrolls(data: any): Observable<any> {
    return this.http.post(this.apiUrlEnroll, data);
  }
  */


  private apiUrlMoney: string = 'aqui pondremos la url de la peticion de la apli';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }

  createClass(data: ClassData): Observable<any> {
    return this.http.post(this.apiUrlClass, data);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrlUsers}/${userId}`);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUsers}/${userId}`);
  }

  updateUser(userId: string, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUsers}/${userId}`, userData);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrlUsers}`, userData);
  }
}
