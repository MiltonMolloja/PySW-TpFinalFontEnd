export class Perfil
{
    id:number;
    nombres:string;
    apellidos:string;
    dni:number;
    fechaNac:Date;
    sexo:string;
    estado:boolean;

    constructor(id?:number, nombres?:string, apellidos?:string, dni?:number, fechaNac?:Date, sexo?:string, estado?:boolean )
    {
        this.id = id;
        this.nombres = nombres;
        this.apellidos = apellidos;
        this.dni = dni;
        this.fechaNac = fechaNac;
        this.sexo = sexo;
        this.estado = estado;
    }

}
