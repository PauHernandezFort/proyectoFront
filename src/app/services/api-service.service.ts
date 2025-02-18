import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Member } from '../interfaces/user.interface';
import { Clases } from '../interfaces/user.interface';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrlUsers = 'http://localhost:3000/api/users';

  private apiUrlClase = 'http://52.2.202.15/api/clases'

  constructor(public http: HttpClient) {}

  getResponsePupils(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlUsers}/${userId}`);
  }

  getUser(userId: number): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrlUsers}/${userId}`);
  }

  updateUser(userId: number, userData: Partial<Member>): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrlUsers}/${userId}`, userData);
  }

  createUser(userData: Member): Observable<any> {
    return this.http.post(`${this.apiUrlUsers}`, userData);
  }

  getResponseClase(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  createClase(claseData: Clases): Observable<any> {
    return this.http.post(`${this.apiUrlClase}`, claseData);
  }
}
