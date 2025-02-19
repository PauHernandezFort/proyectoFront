export interface Pupils {
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
  apellidos:        string;
  email:            string;
  password:         string;
  telefono:         string;
  photo:            string;
  rol:              string;
  fecha_registro:   Date;
  progresos:        null;
  clases:           null;
  clases_apuntadas: null;
  notificaciones:   null;
  fechaRegistro:    null;
  clasesApuntadas:  null;
}

export interface Clase {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
  capacidad: number;
  estado: string;
  ubicacion: string;
}