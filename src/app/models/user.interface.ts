export interface ApiResponse<T> {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: T[];
}

export interface Clases {
  id?: number;
  nombre: string;
  descripcion: string;
  fecha: Date;
  capacidad: number;
  estado: string;
  entrenador: string;
  ubicacion?: string;
  usuariosApuntados: any[];
}

export interface Progreso {
  id?: number;
  fecha: Date;
  descripcion: string;
  archivo: string;
  idMiembro: string;
}

export interface Usuarios {
  id?: number;
  nombre: string;
  apellido?: string;
  email?: string;
  password?: string; // Opcional porque no se debe devolver en respuestas
  telefono?: number;  // Cambiado de number a string
  rol?: string;
  fechaRegistro?: Date | string;
  fotoPerfil?: string;
  progresos?: number[]; // Array con los IDs de los progresos del usuario
  clases?: number[]; // Array con los IDs de clases donde es entrenador
  clasesApuntadas?: number[]; // Array con los IDs de clases en las que el usuario está inscrito
  notificaciones?: number[]; // Array con los IDs de notificaciones
}

export interface Notificaciones {
  id?: number;
  titulo: string;
  mensaje: string;
  fechaEnvio: Date;
  estado: string;
  idUsuario?: number; // ID del usuario al que pertenece la notificación
}

export interface Member {
  id: number; 
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  foto?: string;
  rol: string;
}

