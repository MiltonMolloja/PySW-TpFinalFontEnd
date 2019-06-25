import {Escribano} from './escribano';

export class Novedad {
    id:number;
    escribano:Escribano;
    fecha:Date;
    asunto:string;
    mensaje:string;
    estado:boolean;

Novedad(id?:number, escribano?:Escribano, fecha?:Date, asunto?:string, mensaje?:string, estado?:boolean){
    this.escribano=escribano;
    this.fecha=fecha;
    this.asunto=asunto;
    this.mensaje=mensaje;
    this.estado=estado;
}    
    
}