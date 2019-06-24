import { Escribano } from './escribano';

export class Pago {
  id: number;
  fecha: Date;
  importe: number;
  escribano: Escribano;
  estado: boolean;

  Pago(id?: number, fecha?: Date, importe?: number, escribano?: Escribano, estado?: boolean) {
    this.id = id;
    this.fecha = fecha;
    this.importe = importe;
    this.escribano = escribano;
    this.estado = estado;
  }


}
