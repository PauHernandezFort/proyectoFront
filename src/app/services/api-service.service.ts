import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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


}
