export class Perfil {
  id: number;
  nombres: string;
  apellidos: string;
  dni: number;
  fecha_Nac: Date;
  sexo: string;
  estado: boolean;

  Perfil(id?: number, nombres?: string, apellidos?: string, dni?: number, fecha_Nac?: Date, sexo?: string, estado?: boolean) {
    this.id = ;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.dni = dni;
    this.fecha_Nac = fecha_Nac;
    this.sexo = sexo;
    this.estado = estado;
  }
}

