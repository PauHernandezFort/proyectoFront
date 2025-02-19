import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clases } from '../interfaces/addClass.interface';
import { Member, Pupils } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiPupils = 'http://52.2.202.15/api/usuarios';
  private apiClass = 'http://52.2.202.15/api/clases';
  private apiProgress = 'http://52.2.202.15/api/progresos';

  constructor(public http: HttpClient) { }

  getResponsePupils(url: string): Observable<Pupils> {
    return this.http.get<Pupils>(url);
  }

  createClass(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Clases>(this.apiClass, data, { headers });
  }

  getClases(options: { headers: HttpHeaders }): Observable<any> {
    return this.http.get(this.apiClass, options); // Aquí no necesitas cambiar nada, solo asegúrate de que los headers estén correctos
  }

  getUser(userId: string): Observable<ApiService> {
    return this.http.get<ApiService>(`${this.apiPupils}/${userId}`);
  }

  createPupil(userData: any): Observable<Member> {
    return this.http.post<Member>(this.apiPupils, userData);
  }

  deletePupils(userId: number): Observable<any> {
    const apiUrl = `http://52.2.202.15/api/usuarios/${userId}`;
    return this.http.delete(apiUrl);
  }

  private apiUrlEvents: string = 'http://52.2.202.15/api/clases';
  createEvent(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Clases>(this.apiUrlEvents, data, { headers });
  }

  updatePupils(userId: number, userData: Partial<Member>): Observable<Member> {
    return this.http.put<Member>(`${this.apiPupils}/${userId}`, userData);
  }

  
  private apiUrlEnroll: string = 'aqui pondremos la url de la peticion de la apli';
  
  Enrolls(data: any): Observable<any> {
    return this.http.post(this.apiUrlEnroll, data);
  }

  private apiUrlMoney: string = 'aqui pondremos la url de la peticion de la apli';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }



}
