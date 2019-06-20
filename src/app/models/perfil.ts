export class Perfil
{
    id:number;
    nombres:string;
    apellidos:string;
    dni:number;
    fecha_nac:Date;
    sexo:string;
    estado:boolean;

    constructor(id?:number, nombres?:string, apellidos?:string, dni?:number, fecha_nac?:Date, sexo?:string, estado?:boolean )
    {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.dni = dni;
        this.fecha_nac = fecha_nac;
        this.sexo = sexo;
        this.estado = estado;
    }

}
