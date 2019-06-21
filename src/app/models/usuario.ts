import { Perfil } from './perfil';
import { Escribano } from './escribano';

export class Usuario
{
    id:number;
    username:string;
    password:string;
    email:string;
    tipo:string;
    imagen:string;
    estado:boolean;
    perfil:Perfil = new Perfil() ;
    escribano:Escribano = new Escribano() ;

    constructor(id?:number, username?:string, password?:string, email?:string, tipo?:string, imagen?:string, estado?:boolean, perfil?:Perfil, escribano?:Escribano)
    {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.tipo = tipo;
        this.imagen = imagen;
        this.estado = estado;
        this.perfil = perfil;
        this.escribano = escribano;
    }
}
