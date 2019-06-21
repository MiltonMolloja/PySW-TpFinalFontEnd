import { Escribania } from './escribania';

export class Escribano
{
    id:number;
    escribania:Escribania = new Escribania() ;
    matricula:number;
    universidad:string;
    estado:boolean;

    constructor(id?:number, escribania?:Escribania, matricula?:number, universidad?:string, estado?:boolean)
    {
        this.id = id;
        this.escribania = escribania;
        this.matricula = matricula;
        this.universidad = universidad;
        this.estado = estado;
    }
}
