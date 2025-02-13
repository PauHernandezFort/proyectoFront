export interface User {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  foto?: string; // URL de la foto o base64
  // Añade otros campos que necesites
} 