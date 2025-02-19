export interface ApiResponse<T> {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: T[];
}

export interface Clases {
  id?: null;
  nombre: string;
  descripcion: string;
  fecha: Date;
  capacidad?: number;
  estado: string;
  idEntrenador?: number;
  ubicacion?: string;
  usuariosApuntados: number[];
}

export interface Progreso {
  id?: number;
  fecha: Date;
  descripcion: string;
  archivo?: string; // Puede ser null en PHP, por eso es opcional
  idMiembro?: number; // ID del usuario relacionado con el progreso
}

export interface Usuarios {
  id?: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string; // Opcional porque no se debe devolver en respuestas
  telefono?: number;  // Cambiado de number a string
  rol: string;
  fechaRegistro: Date;
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
  id: number;  // Asegúrate de que id no sea opcional
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  foto?: string;
  rol: string;
}

