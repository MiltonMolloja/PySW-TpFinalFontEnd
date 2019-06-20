import { Escribania } from './escribania';

export class Escribano {
  id: number;
  matricula: number;
  universidad: string;
  escribania: Escribania;
  estado: boolean;

  Escribano(id?: number, matricula?: number, universidad?: string, escribania?: Escribania, estado?: boolean) {
    this.id = id;
    this.matricula = matricula;
    this.universidad = universidad;
    this.escribania = escribania;
    this.estado = estado;
  }

}
