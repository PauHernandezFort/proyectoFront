export interface User {
  id?: number;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  password?: string;
  foto?: string; // Usaremos 'foto' en lugar de 'profileImage'
  rol?: string;
  // Añade otros campos que necesites
} 