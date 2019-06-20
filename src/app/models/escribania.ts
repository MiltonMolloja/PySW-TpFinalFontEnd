export class Escribania
{
    id:number;
    direccion:string;
    telefo:number;
    email:string;
    foto:string;
    latitud:number;
    longitud:number;
    estado:boolean;
    nombre:string;

    constructor(id?:number, direccion?:string, telefono?:number, email?:string, foto?:string, latitud?:number, longitud?:number, estado?:boolean, nombre?:string)
    {
        this.id = id;
        this.direccion  = direccion ;
        this.telefo = telefono ;
        this.email = email ;
        this.foto = foto ;
        this.latitud = latitud ;
        this.longitud = longitud ;
        this.estado = estado ;
        this.nombre = nombre ;
    }
}
