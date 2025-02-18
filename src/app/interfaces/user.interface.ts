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
export interface Respone {
  "@context": string;
  "@id":      string;
  "@type":    string;
  totalItems: number;
  member:     Member[];
}

export interface Member {
  "@id":            string;
  "@type":          string;
  id:               number;
  nombre:           string;
  apellido:         string;
  email:            string;
  password:         string;
  telefono?:        string;
  rol:              string;
  foto?:            string;
  fecha_registro:   Date;
  progresos:        any[];
  clases:           string[];
  clases_apuntadas: any[];
  notificaciones:   any[];
  fechaRegistro:    Date;
  clasesApuntadas:  any[];
}
export interface Clases {
  nombre:        string;
  descripcion:   string;
  fecha:         Date;
  capacidad:     number;
  estado:        string;
  id_entrenador: number;
  ubicacion:     string;
}
