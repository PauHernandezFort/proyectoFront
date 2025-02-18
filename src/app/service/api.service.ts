import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clase } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://52.2.202.15/api/clases';

  constructor(private http: HttpClient) { }

  // Obtener clases por fecha
  getClasesByDate(fecha: string): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrl}/by-date/${fecha}`);
  }

  // Obtener clases inscritas por usuario
  getClasesInscritas(userId: string): Observable<Clase[]> {
    return this.http.get<Clase[]>(`${this.apiUrl}/by-user/${userId}`);
  }

  // Método existente para manejo de dinero (por si se usa después)
  private apiUrlMoney: string = 'http://52.2.202.15/api/money';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }
}
