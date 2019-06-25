export class Escribania {
  id: number;
  direccion: string;
  telefono: number;
  email: number;
  latitud: string;
  longitud:string;
  foto: string;
  estado: boolean;
  nombre: string;

  Escribania(id?: number, direccion?: string, telefono?: number, email?: number,
    latitud?: string, longitud?:string, foto?: string, estado?: boolean, nombre?: string) {
    this.id = id;
    this.direccion = direccion;
    this.telefono = telefono;
    this.email = email;
    this.latitud = latitud;
    this.longitud=longitud;
    this.foto = foto;
    this.estado = estado;
    this.nombre = nombre;
  }


}
