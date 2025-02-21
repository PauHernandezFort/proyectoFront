import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Clases, Usuarios as Pupils, Notificaciones, Progreso, Usuarios } from '../models/user.interface';
import { ApiResponse } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiPupils = 'http://52.2.202.15/api/usuarios';
  private apiClass = 'http://52.2.202.15/api/clases';
  private apiProgress = 'http://52.2.202.15/api/progresos';
  private apiNotificaciones = 'http://52.2.202.15/api/notificaciones';
  private apiUrl = 'http://52.2.202.15/api/qr/';

  constructor(private http: HttpClient) { }

  // Obtener usuarios (pupils)
  getResponsePupils(): Observable<Pupils[]> {
    return this.http.get<ApiResponse<Pupils>>(this.apiPupils).pipe(
      map(response => response.member)
    );
  }

  // Metodo generar QR
  getQrCode(userId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${userId}`, { responseType: 'blob' });
  }

  // Obtener usuario por ID
  getUser(urlIdUser: string): Observable<Pupils> {
    return this.http.get<Pupils>(`http://52.2.202.15${urlIdUser}`);
  }

  // Crear usuario (pupil)
  createPupil(userData: Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Usuarios>(this.apiPupils, userData, { headers });
  }

  // Actualizar usuario (pupil)
  updatePupils(userId: number, userData: Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.put<Usuarios>(`${this.apiPupils}/:${userId}`, userData, { headers });
  }

  // Eliminar usuario (pupil)
  deletePupils(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPupils}/${userId}`);
  }

  // Obtener clases
  getClases(): Observable<Clases[]> {
    return this.http.get<ApiResponse<Clases>>(this.apiClass).pipe(
      map(response => response.member)
    );
  }

  getEvent(): Observable<Clases[]> {
    return this.http.get<ApiResponse<Clases>>(this.apiClass).pipe(
      map(response => response.member)
    );
  }

  // Obtener clases por fecha
  getClasesByDate(fecha: string): Observable<Clases[]> {
    return this.http.get<ApiResponse<Clases>>(`${this.apiClass}/by-date/${fecha}`).pipe(
      map(response => response.member)
    );
  }

  // Obtener clases inscritas por usuario
  getClasesInscritas(userId: string): Observable<Clases[]> {
    return this.http.get<ApiResponse<Clases>>(`${this.apiClass}/by-user/${userId}`).pipe(
      map(response => response.member)
    );
  }
  deleteClases(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiClass}/${userId}`);
  }

  // Crear clase
  createClass(data: Clases): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Clases>(this.apiClass, data, { headers });
  }

  createEvent(data: Clases): Observable<Clases> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Clases>(this.apiClass, data, { headers });
  }

  getClasseById(id: string): Observable<Clases> {
    return this.http.get<Clases>(`${this.apiClass}/${id}`);
  }

  // Obtener progreso
  getProgress(): Observable<Progreso[]> {
    return this.http.get<ApiResponse<Progreso>>(this.apiProgress).pipe(
      map(response => response.member)
    );
  }

  createProgress(data: Progreso) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Progreso>(this.apiProgress, data, { headers });
  }

  // Obtener progreso por ID
  getProgressById(id: number): Observable<Progreso> {
    return this.http.get<Progreso>(`${this.apiProgress}/${id}`);
  }

  // Obtener notificaciones
  getNotificaciones(): Observable<Notificaciones[]> {
    return this.http.get<ApiResponse<Notificaciones>>(this.apiNotificaciones).pipe(
      map(response => response.member)
    );
  }

  // Obtener notificación por ID
  getNotificacionById(id: number): Observable<Notificaciones> {
    return this.http.get<Notificaciones>(`${this.apiNotificaciones}/${id}`);
  }

  // Obtener ubicaciones disponibles
  getUbicaciones(): Observable<string[]> {
    return this.http.get<ApiResponse<{ nombre: string }>>('http://52.2.202.15/api/ubicaciones').pipe(
      map(response => response.member.map(ubicacion => ubicacion.nombre))
    );
  }

  // Obtener el usuario autenticado actualmente
  getCurrentUser(): Observable<Pupils> {
    return this.http.get<Pupils>('http://52.2.202.15/api/usuarioActual');
  }

  // Método para manejar dinero (por si se usa después)
  private apiUrlMoney: string = 'http://52.2.202.15/api/money';
  createMoney(data: any): Observable<any> {
    return this.http.post(this.apiUrlMoney, data);
  }

  // Método para registrar un nuevo usuario
  registerPupil(userData: Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });

    const userDataToSend: any = {
      nombre: userData.nombre,
      apellido: userData.apellido,
      email: userData.email,
      password: userData.password,
      telefono: Number(userData.telefono) || 0,
      rol: userData.rol
    };

    console.log('Enviando datos:', userDataToSend);

    return this.http.post<Usuarios>('http://52.2.202.15/api/usuarios', userDataToSend, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error en registro:', error);
        return throwError(() => new Error(error.error?.message || 'Error en el registro del usuario.'));
      })
    );
  }

  // Método para iniciar sesión
  loginPupil(credentials: { email: string; password: string }): Observable<Usuarios> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/ld+json'
    });

    return this.http.post<Usuarios>(`${this.apiPupils}/login`, credentials, { headers });
  }
}
