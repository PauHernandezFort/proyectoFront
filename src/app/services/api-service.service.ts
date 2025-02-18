import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clases } from '../interfaces/addClass.interface';
import { Pupils } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUsers= 'http://52.2.202.15/api/users';
  private apiUrl = 'http://52.2.202.15/api/clases';

  constructor(public http: HttpClient) { }

  public getResponsePupils(url: string): Observable<Pupils> {
    return this.http.get<Pupils>(url);
  }

  createClass(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Clases>(this.apiUrl, data, { headers });
  }
  getClases(options: { headers: HttpHeaders }): Observable<any> {
    return this.http.get(this.apiUrl, options); // Aquí no necesitas cambiar nada, solo asegúrate de que los headers estén correctos
  }

  public getUsuario(url: string): Observable<ApiService> {
    return this.http.get<ApiService>(url);
  }


  private apiUrlEvents: string = 'http://52.2.202.15/api/clases';
  createEvent(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Clases>(this.apiUrlEvents, data, { headers });


  }
  /*
  private apiUrlEnroll: string = 'aqui pondremos la url de la peticion de la apli';
  
  Enrolls(data: any): Observable<any> {
    return this.http.post(this.apiUrlEnroll, data);
  }
  


  private apiUrlMoney: string = 'aqui pondremos la url de la peticion de la apli';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }

  createClass(data: ClassData): Observable<any> {
    return this.http.post(this.apiUrlClass, data);
  }
*/

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUsers}/${userId}`);
  }

  getUser(userId: string): Observable<ApiService> {
    return this.http.get<ApiService>(`${this.apiUsers}/${userId}`);
  }

  updateUser(userId: string, userData: Partial<ApiService>): Observable<ApiService> {
    return this.http.put<ApiService>(`${this.apiUsers}/${userId}`, userData);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUsers}`, userData);
  }
}
