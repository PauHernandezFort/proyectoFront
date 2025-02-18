

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
  apellido:         string;
  email:            string;
  password:         string;
  telefono:         string;
  rol:              string;
  fecha_registro:   Date;
  progresos:        any[];
  clases:           any[];
  clases_apuntadas: any[];
  notificaciones:   any[];
  fechaRegistro:    Date;
  clasesApuntadas:  any[];
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