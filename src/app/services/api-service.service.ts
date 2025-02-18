import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Clases } from '../interfaces/addClass.interface';
import { User } from '../interfaces/user.interface';
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
  private apiUsarios = 'http://52.2.202.15/api/users';
  private apiUrl = 'http://52.2.202.15/api/clases';
  createClass(data: any, p0: { headers: HttpHeaders; }): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Clases>(this.apiUrl, data, { headers });
  }
  getClases(options: { headers: HttpHeaders }): Observable<any> {
    return this.http.get(this.apiUrl, options); // Aquí no necesitas cambiar nada, solo asegúrate de que los headers estén correctos
  }
  
  public getUsuario(url: string): Observable<User> {
    return this.http.get<User>(url);
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
*/

}
