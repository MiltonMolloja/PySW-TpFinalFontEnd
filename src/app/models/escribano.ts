import {Escribania} from './escribania' ;

export class Escribano
{
    id:number;
    matricula:number;
    universidad:string;
    estado:boolean;
    escribania:Escribania;

    constructor(id?:number, matricula?:number, universidad?:string, estado?:boolean, escribania?:Escribania)
    {
        this.id = id;
        this.matricula = matricula;
        this.universidad = universidad;
        this.estado = estado;
        this.escribania = escribania;
    }
}
