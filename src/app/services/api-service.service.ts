import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//falta importar el modulo de la interfaz

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(public http: HttpClient) { }

  public getResponse(url: string): Observable<Response> {
    return this.http.get<Response>(url);
    }
    
}
