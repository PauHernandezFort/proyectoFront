import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, tap, switchMap } from 'rxjs';
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
  private apiPupilPhoto = 'http://52.2.202.15/api/usuarios/fotoPerfil'

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

  updatePhotoUser(imageData: { id: number; fotoPerfil: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { imagen: imageData.fotoPerfil, id: imageData.id };

    return this.http.post<any>(this.apiPupilPhoto, body, { headers });
  }
  // Crear usuario (pupil)
  createPupil(userData: Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/ld+json' });
    return this.http.post<Usuarios>(this.apiPupils, userData, { headers });
  }

  // Actualizar usuario (pupil)
  updatePupils(userId: number, userData: Usuarios): Observable<Usuarios> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    });
    return this.http.patch<Usuarios>(`${this.apiPupils}/${userId}`, userData, { headers });
  }

  // Eliminar usuario (pupil)
  deletePupils(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiPupils}/${userId}`);
  }

  // Obtener clases
  getClases(): Observable<Clases[]> {
    return this.http.get<ApiResponse<Clases>>('http://52.2.202.15/api/clases').pipe(
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
  getCurrentUser(): Observable<Pupils | null> {
    const userId = localStorage.getItem('userId'); // Recupera el ID del usuario
    if (!userId) {
      console.warn("⚠ No hay ID de usuario en LocalStorage, redirigiendo a login.");
      return throwError(() => new Error("No hay usuario autenticado."));
    }

    return this.http.get<Pupils>(`http://52.2.202.15/api/usuarios/${userId}`).pipe(
      tap(response => console.log(" Usuario autenticado recibido:", response)), // Debug
      catchError(error => {
        console.error(" Error al obtener los datos del usuario:", error);
        return throwError(() => new Error("No se pudo cargar el usuario."));
      })
    );
  }

  // Inscribir usuario a una clase
  inscribirClase(userId: string, claseId: number): Observable<any> {
    const claseUrl = `http://52.2.202.15/api/clases/${claseId}`;
    const usuarioUrl = `http://52.2.202.15/api/usuarios/${userId}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    });

    //  Agregar el usuario a la lista de `usuariosApuntados` en la clase
    const actualizarClase = this.http.patch(claseUrl, {
      usuariosApuntados: [`/api/usuarios/${userId}`]
    }, { headers });

    //  Agregar la clase a la lista de `clasesApuntadas` en el usuario
    const actualizarUsuario = this.http.patch(usuarioUrl, {
      clasesApuntadas: [`/api/clases/${claseId}`]
    }, { headers });

    return actualizarClase.pipe(
      switchMap(() => actualizarUsuario), // 🔹 Primero actualiza la clase, luego el usuario
      tap(() => console.log(` Usuario ${userId} inscrito en la clase ${claseId}`)),
      catchError(error => {
        console.error(" Error al inscribirse en la clase:", error);
        return throwError(() => new Error("No se pudo inscribir en la clase."));
      })
    );
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
  loginPupil(credentials: { email: string; password: string }): Observable<any> {
    if (!credentials.email || !credentials.password) {
      console.error(" ERROR: El email o la contraseña están vacíos");
      return throwError(() => new Error("El email y la contraseña son obligatorios."));
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/ld+json',
      'Accept': 'application/ld+json'
    });

    const formattedCredentials = {
      correo: credentials.email,
      password: credentials.password
    };

    console.log(' Enviando credenciales a la API:', formattedCredentials);

    return this.http.post<any>(`${this.apiPupils}/login`, formattedCredentials, { headers }).pipe(
      tap(response => console.log(" Respuesta de la API:", response)),
      switchMap(response => {
        if (response.success) {
          //  **Segunda petición para obtener el usuario completo**
          return this.http.get<Usuarios>(`${this.apiPupils}?email=${credentials.email}`, { headers }).pipe(
            tap(userResponse => {
              console.log(" Usuario autenticado:", userResponse);

              if (userResponse.id) {
                // Guardar el ID en localStorage para futuras consultas
                localStorage.setItem('userId', userResponse.id.toString());
              }
            })
          );
        } else {
          return throwError(() => new Error("Error en la autenticación"));
        }
      }),
      catchError((error) => {
        console.error(' Error en el inicio de sesión:', error);
        return throwError(() => new Error(error.error?.error || 'Error en el servidor, intente nuevamente.'));
      })
    );
  }

  deleteProgress(progressId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiProgress}/${progressId}`);
  }

  anularInscripcion(userId: string, claseId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/merge-patch+json'
    });

    // Eliminar la clase de las clasesApuntadas del usuario
    const actualizarUsuario = this.http.patch(`${this.apiPupils}/${userId}`, {
      clasesApuntadas: []
    }, { headers });

    // Eliminar el usuario de los usuariosApuntados de la clase
    const actualizarClase = this.http.patch(`${this.apiClass}/${claseId}`, {
      usuariosApuntados: []
    }, { headers });

    return actualizarUsuario.pipe(
      switchMap(() => actualizarClase),
      tap(() => console.log(`Usuario ${userId} anulado de la clase ${claseId}`)),
      catchError(error => {
        console.error("Error al anular la inscripción:", error);
        return throwError(() => new Error("No se pudo anular la inscripción."));
      })
    );
  }

}