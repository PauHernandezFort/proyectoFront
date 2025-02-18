import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clases } from '../interfaces/addClass.interface';
//falta importar el modulo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(public http: HttpClient) { }

  /*metodos para hacer peticiones a la API*
  
  public getResponse(url: string): Observable<Response> {
    return this.http.get<Response>(url);
    }

    
*/
  
private apiUrl = 'http://52.2.202.15/api/clases';  // URL de tu API

  createClass(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    // Configurar los encabezados para LD-JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json'
    });

    // Realizar la solicitud POST con los encabezados correctos
    return this.http.post<Clases>(this.apiUrl, data, { headers });
  }
}

  
  

  
  /*
  private apiUrlEvents: string = 'aqui pondremos la url de la peticion de la apli'
  createEvent(data: any): Observable<any> {
    return this.http.post(this.apiUrlEvents, data);
  
  
  }
  
  private apiUrlEnroll: string = 'aqui pondremos la url de la peticion de la apli';
  
  Enrolls(data: any): Observable<any> {
    return this.http.post(this.apiUrlEnroll, data);
  }
  */


  /*private apiUrlMoney: string = 'aqui pondremos la url de la peticion de la apli';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }
*/


